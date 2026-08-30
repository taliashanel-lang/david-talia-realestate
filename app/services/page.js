import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { services } from "@/data/services";
import { unsplashUrl } from "@/lib/unsplash";
import { site } from "@/lib/site";

export const metadata = {
  title: "שירותים",
  description: `כל שירותי התיווך והנדל"ן של ${site.fullName} — מכירה, קנייה, השכרה, אחזקת נכסים ושיווק פרויקטים.`,
};

const images = {
  sale: "1600596542815-ffad4c1539a9",
  buyers: "1512917774080-9991f1c4c750",
  rentals: "1580587771525-78b9dba3b914",
  management: "1613977257363-707ba9348227",
  marketing: "1449844908441-8829872d2607",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="השירותים שלנו"
        title="כל מה שאתם צריכים בתחום הנדל&quot;ן"
        description="מכירה, קנייה, השכרה, אחזקה ושיווק פרויקטים — הכל תחת ליווי אישי אחד."
      />

      <div className="divide-y divide-black/5">
        {services.map((service, i) => {
          const Icon = Icons[service.icon] ?? Icons.Home;
          const reversed = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20"
            >
              <div
                className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <FadeIn>
                  <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
                    <Image
                      src={unsplashUrl(images[service.slug], { width: 1200 })}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={100}>
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-black text-brand-gold">
                    <Icon size={26} />
                  </div>
                  <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-brand-black sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-base leading-7 text-black/65">{service.description}</p>
                  <ul className="mb-8 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-black/70">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gold hover:text-brand-black"
                  >
                    לקבלת ייעוץ בנושא
                    <ArrowLeft size={16} />
                  </Link>
                </FadeIn>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-brand-black px-5 py-16 text-center text-white lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-extrabold sm:text-3xl">לא בטוחים באיזה שירות אתם צריכים?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            דברו איתנו ונשמח להבין את הצורך שלכם ולהתאים את הפתרון הנכון.
          </p>
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
