import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, Users, Handshake, Clock3, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { unsplashUrl } from "@/lib/unsplash";
import { site, telHref } from "@/lib/site";

const values = [
  {
    icon: ShieldCheck,
    title: "שקיפות מלאה",
    text: "בכל שלב בעסקה תדעו בדיוק איפה אתם עומדים — בלי הפתעות.",
  },
  {
    icon: Users,
    title: "ליווי אישי",
    text: "אנחנו זמינים עבורכם לאורך כל התהליך, מהפגישה הראשונה ועד המפתח.",
  },
  {
    icon: Handshake,
    title: "רשת אנשי מקצוע",
    text: "שיתופי פעולה עם עורכי דין, שמאים ויועצי משכנתאות מהשורה הראשונה.",
  },
  {
    icon: Clock3,
    title: "זמינות גבוהה",
    text: "מענה מהיר וזמין, כי בנדל\"ן זמן הוא לעיתים ההבדל בין עסקה לפספוס.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-brand-black text-white">
        <Image
          src={unsplashUrl("1560518883-ce09059eeffa", { width: 2000 })}
          alt="נכס יוקרתי בשעת בין ערביים"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/30" />

        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center lg:px-8">
          <FadeIn>
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-brand-gold">
              דיויד עזריה &amp; טליה כהן | תיווך נדל&quot;ן
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              David<span className="text-brand-gold">&amp;</span>talia
            </h1>
            <p className="mt-2 text-sm font-semibold tracking-[0.3em] text-white/70 sm:text-base">
              REAL ESTATE
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {site.tagline}
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="relative mx-auto mt-8 h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-gold/40">
              <Image src="/logo.jpg" alt={site.fullName} fill sizes="64px" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={telHref(site.phones[0].number)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-base font-semibold text-brand-black transition-transform hover:scale-105 sm:w-auto"
              >
                <Phone size={18} />
                התקשרו עכשיו
              </a>
              <Link
                href="/listings"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-brand-gold hover:text-brand-gold sm:w-auto"
              >
                לצפייה בנכסים שלי
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative h-80 overflow-hidden rounded-2xl sm:h-[26rem]">
              <Image
                src={unsplashUrl("1568605114967-8130f3a36994", { width: 1200 })}
                alt={'לחיצת יד בעת סגירת עסקת נדל"ן'}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-red">אודותינו</p>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              נעים מאוד, אנחנו דיויד וטליה
            </h2>
            <p className="mb-4 text-base leading-7 text-black/65">
              אנו מציעים שירותי תיווך וייעוץ נדל&quot;ן מתוך מחויבות מלאה לשירות אישי, מקצועיות ושקיפות מלאה מול הלקוח.
              אנו מלווים את לקוחותינו בכל שלבי העסקה — החל מהבנת הצרכים ועד לסגירת חוזה — בצורה חלקה, בטוחה ויעילה.
            </p>
            <p className="mb-8 text-base leading-7 text-black/65">
              בין אם אתם מחפשים לקנות דירה חדשה, למכור נכס קיים, להשקיע בנדל&quot;ן מניב או לשכור נכס מסחרי — אנחנו כאן
              בשבילכם.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-gold hover:text-brand-black"
            >
              קראו עלינו עוד
              <ArrowLeft size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-red">השירותים שלנו</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              כל מה שאתם צריכים, תחת קורת גג אחת
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 80}>
                <ServiceCard service={service} href={`/services#${service.slug}`} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-gold">למה אנחנו</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              נדל&quot;ן עושים עם מי שאפשר לסמוך עליו
            </h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 80} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                  <v.icon size={26} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{v.title}</h3>
                <p className="text-sm leading-6 text-white/60">{v.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-gold px-5 py-16 text-center lg:px-8">
        <FadeIn>
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold tracking-tight text-brand-black sm:text-3xl">
            בואו נתחיל את הדרך לבית החדש שלכם
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-black/70">
            השאירו פרטים ונחזור אליכם בהקדם, או התקשרו אלינו ישירות עוד היום.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-brand-black px-8 py-4 text-base font-semibold text-white transition-transform hover:scale-105 sm:w-auto"
            >
              יצירת קשר
            </Link>
            <a
              href={telHref(site.phones[0].number)}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-black px-8 py-4 text-base font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white sm:w-auto"
            >
              <Phone size={18} />
              {site.phones[0].number}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
