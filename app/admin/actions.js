"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { requireAdmin, setAdminCookie, clearAdminCookie } from "@/lib/admin-auth";
import { getSupabaseAdmin, LISTINGS_BUCKET } from "@/lib/supabase";

export async function login(formData) {
  const password = formData.get("password");
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logout() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function addListing(formData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const file = formData.get("image");

  if (!title || !category) {
    throw new Error("חובה למלא כותרת וקטגוריה");
  }

  const admin = getSupabaseAdmin();
  let image_url = null;

  if (file && typeof file === "object" && file.size > 0) {
    const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
    const path = `${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await admin.storage
      .from(LISTINGS_BUCKET)
      .upload(path, buffer, { contentType: file.type || "image/jpeg" });
    if (uploadError) throw new Error(uploadError.message);
    const { data } = admin.storage.from(LISTINGS_BUCKET).getPublicUrl(path);
    image_url = data.publicUrl;
  }

  const { error } = await admin.from("listings").insert({ title, category, area, summary, image_url });
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/listings");
}

export async function deleteListing(id) {
  await requireAdmin();
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("listings").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/listings");
}
