import { Lock } from "lucide-react";
import { login } from "../actions";

export const metadata = {
  title: "כניסה לניהול",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-brand-black px-5 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-black">
          <Lock size={24} />
        </div>
        <h1 className="mb-6 text-center text-xl font-bold">כניסה לניהול הנכסים</h1>
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/80">
              סיסמה
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-gold"
            />
          </div>
          {hasError && <p className="text-sm text-red-400">סיסמה שגויה, נסי שוב.</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-105"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}
