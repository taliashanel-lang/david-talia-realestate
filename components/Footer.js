import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { site, telHref } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-black text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="text-xl font-bold text-white">
            David<span className="text-brand-gold">&</span>talia
          </div>
          <p className="mt-3 text-sm leading-6">{site.tagline}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פייסבוק"
              className="rounded-full border border-white/15 p-2 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={site.social.instagramTalia}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="אינסטגרם טליה"
              className="rounded-full border border-white/15 p-2 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={site.social.instagramDavid}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="אינסטגרם דיויד"
              className="rounded-full border border-white/15 p-2 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">ניווט מהיר</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-brand-gold" href="/about">אודות</Link></li>
            <li><Link className="hover:text-brand-gold" href="/services">שירותים</Link></li>
            <li><Link className="hover:text-brand-gold" href="/listings">הנכסים שלי</Link></li>
            <li><Link className="hover:text-brand-gold" href="/testimonials">חוות דעת</Link></li>
            <li><Link className="hover:text-brand-gold" href="/contact">יצירת קשר</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">מידע נוסף</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-brand-gold" href="/privacy">מדיניות פרטיות</Link></li>
            <li><Link className="hover:text-brand-gold" href="/accessibility">הצהרת נגישות</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">יצירת קשר</h3>
          <ul className="space-y-2 text-sm">
            {site.phones.map((p) => (
              <li key={p.number}>
                <a href={telHref(p.number)} className="flex items-center gap-2 hover:text-brand-gold">
                  <Phone size={14} />
                  {p.label}: {p.number}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-brand-gold">
                <Mail size={14} />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40 lg:px-8">
        © {year} David&talia Real Estate. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
