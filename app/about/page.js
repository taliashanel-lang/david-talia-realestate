import Image from "next/image";
import { ShieldCheck, Users, Handshake, Clock3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { unsplashUrl } from "@/lib/unsplash";
import { site } from "@/lib/site";

export const metadata = {
  title: "אודות",
  description: `אודות ${site.fullName} — דיויד עזריה וטליה כהן, שירותי תיווך וייעוץ נדל"ן מקצועיים.`,
};

const valuesList = [
  {
    icon: ShieldCheck,
    title: "שקיפות",
    text: "אנחנו מאמינים שעסקת נדל\"ן טובה מתחילה בשקיפות מלאה — לגבי מחיר, תהליך ותנאים.",
  },
  {
    icon: Users,
    title: "שירות אישי",
    text: "כל לקוח מקבל התייחסות אישית ומותאמת, ולא תהליך גנרי אחיד לכולם.",
  },
  {
    icon: Handshake,
    title: "מקצועיות",
    text: "ניסיון בשטח וידע מעמיק בשוק, לצד שיתופי פעולה עם אנשי מקצוע מהשורה הראשונה.",
  },
  {
    icon: Clock3,
    title: "זמינות",
    text: "אנחנו כאן בשבילכם לאורך כל התהליך — עם מענה זמין ומהיר לכל שאלה.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="מי אנחנו"
        title="נעים מאוד, אנחנו דיויד עזריה וטליה כהן"
        description={'שני שמות, מחויבות אחת: ללוות אתכם לעסקת הנדל"ן הנכונה עבורכם.'}
      />

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <FadeIn className="order-2 lg:order-1">
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-red">הסיפור שלנו</p>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-brand-black">
              תיווך נדל&quot;ן שמתחיל בהקשבה
            </h2>
            <div className="space-y-4 text-base leading-7 text-black/65">
              <p>
                אנו מציעים שירותי תיווך וייעוץ נדל&quot;ן מתוך מחויבות מלאה לשירות אישי, מקצועיות ושקיפות מלאה מול
                הלקוח. אנו מלווים את לקוחותינו בכל שלבי העסקה – החל מהבנת הצרכים והיכרות עם השוק, דרך חיפושים
                מדויקים ועד לסגירת חוזה – בצורה חלקה, בטוחה ויעילה.
              </p>
              <p>
                בין אם אתם מחפשים לקנות דירה חדשה, למכור נכס קיים, להשקיע בנדל&quot;ן מניב או לשכור נכס מסחרי —
                אנחנו כאן בשבילכם. עם ניסיון בשטח, גישה מותאמת אישית, ושיתופי פעולה עם אנשי מקצוע מהשורה הראשונה
                (עורכי דין, שמאים, יועצי משכנתאות ועוד) — אנחנו נדאג שתעשו את העסקה הנכונה, בזמן הנכון.
              </p>
              <p className="font-semibold text-brand-black">
                בואו נתחיל את הדרך לבית החדש שלכם – כי נדל&quot;ן עושים עם מי שאפשר לסמוך עליו.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100} className="order-1 lg:order-2">
            <div className="relative h-80 overflow-hidden rounded-2xl sm:h-[26rem]">
              <Image
                src={unsplashUrl("1600607687939-ce8a6c25118c", { width: 1200 })}
                alt="נכס מוצג על ידי המשרד"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-red">הערכים שמנחים אותנו</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
              המשנה שלנו
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valuesList.map((v, i) => (
              <FadeIn key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-black/10 p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/40 hover:shadow-xl">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-black text-brand-gold">
                    <v.icon size={26} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-black">{v.title}</h3>
                  <p className="text-sm leading-6 text-black/60">{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-red">הצוות</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">מי מלווה אתכם</h2>
          </FadeIn>
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
            {[
              { name: "טליה כהן", role: "מתווכת ויועצת נדל\"ן", phone: site.phones[0].number },
              { name: "דיויד עזריה", role: "מתווך ויועץ נדל\"ן", phone: site.phones[1].number },
            ].map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-black text-2xl font-bold text-brand-gold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-brand-black">{member.name}</h3>
                  <p className="mt-1 text-sm text-black/50">{member.role}</p>
                  <p className="mt-3 text-sm font-semibold text-brand-gold">{member.phone}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
