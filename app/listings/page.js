import Link from "next/link";
import Image from "next/image";
import { Home, Phone, MessageCircle, Images } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { getSupabasePublic, isSupabaseConfigured } from "@/lib/supabase";
import { categories } from "@/data/categories";
import { site, telHref } from "@/lib/site";

export const metadata = {
  title: "הנכסים שלי",
  description: `הנכסים הפעילים למכירה ולהשכרה של ${site.fullName}.`,
};

async function getListings() {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export default async function ListingsPage() {
  const listings = await getListings();

  return (
    <>
      <PageHero
        eyebrow="נכסים פעילים"
        title="הנכסים שלי"
        description="נכסים למכירה ולהשכרה שאני מלווה כרגע — מתעדכן באופן שוטף."
      />

      {listings.length > 0 ? (
        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, i) => (
              <FadeIn key={listing.id} delay={(i % 3) * 80}>
                <Link
                  href={`/listings/${listing.id}`}
                  className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-56 w-full bg-black/5">
                    {listing.image_urls?.[0] && (
                      <Image
                        src={listing.image_urls[0]}
                        alt={listing.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-brand-black/85 px-3 py-1 text-xs font-semibold text-brand-gold">
                      {categories.find((c) => c.slug === listing.category)?.label ?? listing.category}
                    </span>
                    {listing.image_urls?.length > 1 && (
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-black/85 px-3 py-1 text-xs font-semibold text-white">
                        <Images size={12} />
                        {listing.image_urls.length}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-gold">
                      {listing.title}
                    </h3>
                    {listing.area && <p className="mb-2 text-xs font-medium text-black/40">{listing.area}</p>}
                    {listing.summary && (
                      <p className="text-sm leading-6 text-black/60">{listing.summary}</p>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      ) : (
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
      )}
    </>
  );
}
