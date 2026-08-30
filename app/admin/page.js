import Image from "next/image";
import { Trash2, LogOut, ImagePlus, AlertTriangle } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { categories } from "@/data/categories";
import { addListing, deleteListing, logout } from "./actions";

export const metadata = {
  title: "ניהול נכסים",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
          <AlertTriangle size={26} />
        </div>
        <h1 className="mb-3 text-xl font-bold text-brand-black">חיבור למסד הנתונים לא הושלם</h1>
        <p className="leading-7 text-black/60">
          כדי לנהל נכסים צריך להגדיר את משתני הסביבה של Supabase בוורסל
          (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY).
        </p>
      </div>
    );
  }

  const admin = getSupabaseAdmin();
  const { data: listings } = await admin
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  const usableCategories = categories.filter((c) => c.slug !== "all");

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-brand-black">ניהול נכסים</h1>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black/70 transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <LogOut size={16} />
            התנתקות
          </button>
        </form>
      </div>

      <section className="mb-14 rounded-2xl border border-black/10 bg-white p-7">
        <h2 className="mb-5 text-lg font-bold text-brand-black">הוספת נכס חדש</h2>
        <form action={addListing} encType="multipart/form-data" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-black/70">
                כותרת *
              </label>
              <input
                id="title"
                name="title"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-brand-gold"
                placeholder='לדוגמה: דירת 3 חדרים ברמת גן'
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-black/70">
                קטגוריה *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-brand-gold"
              >
                {usableCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-black/70">
              אזור / שכונה
            </label>
            <input
              id="area"
              name="area"
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-brand-gold"
              placeholder="לדוגמה: רמת גן"
            />
          </div>

          <div>
            <label htmlFor="summary" className="mb-1.5 block text-sm font-medium text-black/70">
              תיאור קצר
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              className="w-full resize-none rounded-xl border border-black/15 px-4 py-2.5 outline-none focus:border-brand-gold"
              placeholder="כמה מילים על הנכס..."
            />
          </div>

          <div>
            <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-black/70">
              תמונה
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-brand-gold"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-105"
          >
            <ImagePlus size={16} />
            הוספת נכס
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-5 text-lg font-bold text-brand-black">
          הנכסים הפעילים ({listings?.length ?? 0})
        </h2>
        {!listings?.length && (
          <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-black/50">
            עדיין לא נוספו נכסים.
          </p>
        )}
        <div className="space-y-3">
          {listings?.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4"
            >
              {listing.image_url ? (
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={listing.image_url} alt={listing.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-16 w-20 shrink-0 rounded-lg bg-black/5" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-brand-black">{listing.title}</p>
                <p className="text-sm text-black/50">
                  {categories.find((c) => c.slug === listing.category)?.label ?? listing.category}
                  {listing.area ? ` · ${listing.area}` : ""}
                </p>
              </div>
              <form action={deleteListing.bind(null, listing.id)}>
                <button
                  type="submit"
                  aria-label="מחיקת נכס"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/50 transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
