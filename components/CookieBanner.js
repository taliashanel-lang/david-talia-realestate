"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "dt-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const respond = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-brand-gold/30 bg-brand-black p-5 text-white shadow-2xl sm:flex-row sm:items-center">
        <Cookie className="mt-1 shrink-0 text-brand-gold sm:mt-0" size={24} />
        <p className="flex-1 text-sm leading-6 text-white/80">
          אנו משתמשים בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלכם באתר. המשך גלישה מהווה הסכמה לשימוש בעוגיות בהתאם ל
          <Link href="/privacy" className="mx-1 text-brand-gold underline underline-offset-2">
            מדיניות הפרטיות
          </Link>
          שלנו.
        </p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => respond("declined")}
            className="flex-1 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 sm:flex-none"
          >
            דחייה
          </button>
          <button
            type="button"
            onClick={() => respond("accepted")}
            className="flex-1 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition-transform hover:scale-105 sm:flex-none"
          >
            מאשר/ת
          </button>
        </div>
      </div>
    </div>
  );
}
