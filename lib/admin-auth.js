import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const COOKIE_NAME = "dt_admin";

function expectedToken() {
  return crypto.createHash("sha256").update(`${process.env.ADMIN_PASSWORD}:dt-admin-salt`).digest("hex");
}

export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return Boolean(token) && token === expectedToken();
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
