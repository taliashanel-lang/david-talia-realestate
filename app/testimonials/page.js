import Link from "next/link";
import { Quote, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import StarRating from "@/components/StarRating";
import { testimonials, overallRating, reviewsCount, reviewsSourceUrl } from "@/data/testimonials";
import { site } from "@/lib/site";

export const metadata = {
  title: "חוות דעת",
  description: `חוות דעת של לקוחות ${site.fullName} — דירוג ${overallRating} מתוך 5, ${reviewsCount} חוות דעת.`,
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="מה אומרים עלינו" title="חוות דעת מלקוחות" />

      <section className="px-5 pt-16 lg:px-8">
        <FadeIn className="mx-auto mb-14 flex max-w-xl flex-col items-center gap-3 text-center">
          <StarRating rating={5} size={26} />
          <p className="text-2xl font-extrabold text-brand-black">
            {overallRating} מתוך 5 <span className="text-black/40">·</span> {reviewsCount} חוות דעת
          </p>
          <a
            href={reviewsSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black transition-colors hover:text-brand-gold"
          >
            לצפייה בכל חוות הדעת ב-BizReviews
            <ExternalLink size={14} />
          </a>
        </FadeIn>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name + i} delay={(i % 3) * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/40 hover:shadow-xl">
                <Quote className="mb-3 text-brand-gold/40" size={28} />
                <p className="mb-5 flex-1 whitespace-pre-line text-sm leading-6 text-black/70">{t.text}</p>
                <div className="flex items-center justify-between border-t border-black/5 pt-4">
                  <div>
                    <p className="text-sm font-bold text-brand-black">{t.name}</p>
                    {t.city && <p className="text-xs text-black/40">{t.city}</p>}
                  </div>
                  <StarRating rating={t.rating} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-brand-black px-5 py-16 text-center text-white lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-extrabold sm:text-3xl">רוצים להיות הלקוחות המרוצים הבאים?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">נשמח ללוות גם אתכם בדרך לעסקת הנדל&quot;ן הנכונה.</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 text-base font-semibold text-brand-black transition-transform hover:scale-105"
          >
            יצירת קשר
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
