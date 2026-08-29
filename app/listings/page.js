import Link from "next/link";
import { Home, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { site, telHref } from "@/lib/site";

export const metadata = {
  title: "הנכסים שלי",
  description: `הנכסים הפעילים למכירה ולהשכרה של ${site.fullName}.`,
};

export default function ListingsPage() {
  return (
    <>
      <PageHero
        eyebrow="נכסים פעילים"
        title="הנכסים שלי"
        description="נכסים למכירה ולהשכרה שאני מלווה כרגע — מתעדכן באופן שוטף."
      />

      <section className="px-5 py-20 lg:px-8">
        <FadeIn className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-black text-brand-gold">
            <Home size={28} />
          </div>
          <h2 className="mb-3 text-xl font-bold text-brand-black">
            כרגע אין נכסים מפורסמים באתר
          </h2>
          <p className="mb-8 text-base leading-7 text-black/60">
            רשימת הנכסים הפעילים שלי מתעדכנת באופן שוטף. השאירו פרטים ואחזור אליכם באופן אישי עם
            הנכסים המתאימים ביותר עבורכם, בהתאם לדרישות ולתקציב שלכם.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-black transition-transform hover:scale-105 sm:w-auto"
            >
              <MessageCircle size={16} />
              השאירו פרטים
            </Link>
            <a
              href={telHref(site.phones[0].number)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-gold hover:text-brand-gold sm:w-auto"
            >
              <Phone size={16} />
              {site.phones[0].number}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
