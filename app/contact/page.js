import { Phone, Mail, Clock3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { site, telHref } from "@/lib/site";

export const metadata = {
  title: "יצירת קשר",
  description: `יצירת קשר עם ${site.fullName} — השאירו פרטים או התקשרו אלינו ישירות.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="נשמח לשמוע מכם"
        title="יצירת קשר"
        description="השאירו פרטים ונחזור אליכם בהקדם, או פנו אלינו ישירות בטלפון או במייל."
      />

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <div className="rounded-2xl bg-brand-black p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-extrabold text-white">השאירו הודעה</h2>
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={100} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-black/10 bg-white p-8">
              <h2 className="mb-6 text-2xl font-extrabold text-brand-black">פרטי התקשרות</h2>
              <ul className="space-y-5">
                {site.phones.map((p) => (
                  <li key={p.number} className="flex items-start gap-3">
                    <Phone size={20} className="mt-0.5 text-brand-gold" />
                    <div>
                      <p className="text-sm font-semibold text-brand-black">{p.label}</p>
                      <a href={telHref(p.number)} className="text-black/60 transition-colors hover:text-brand-gold">
                        {p.number}
                      </a>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <Mail size={20} className="mt-0.5 text-brand-gold" />
                  <div>
                    <p className="text-sm font-semibold text-brand-black">דוא&quot;ל</p>
                    <a href={`mailto:${site.email}`} className="text-black/60 transition-colors hover:text-brand-gold">
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 size={20} className="mt-0.5 text-brand-gold" />
                  <div>
                    <p className="text-sm font-semibold text-brand-black">זמינות</p>
                    <p className="text-black/60">א&apos;-ה&apos; 09:00–19:00, ו&apos; עד הצהריים</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="mb-3 text-sm font-semibold text-brand-black">עקבו אחרינו</p>
                <div className="flex gap-3">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="פייסבוק"
                    className="rounded-full border border-black/15 p-2.5 text-black/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                  >
                    <FacebookIcon size={18} />
                  </a>
                  <a
                    href={site.social.instagramTalia}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="אינסטגרם טליה"
                    className="rounded-full border border-black/15 p-2.5 text-black/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href={site.social.instagramDavid}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="אינסטגרם דיויד"
                    className="rounded-full border border-black/15 p-2.5 text-black/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                  >
                    <InstagramIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
