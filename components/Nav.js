"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";

const links = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/services", label: "שירותים" },
  { href: "/listings", label: "הנכסים שלי" },
  { href: "/testimonials", label: "חוות דעת" },
  { href: "/contact", label: "יצירת קשר" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur border-b border-brand-gold/20"
          : "bg-brand-black border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image src="/logo.jpg" alt={site.fullName} fill sizes="44px" className="object-cover" priority />
          </span>
          <span className="hidden text-sm font-semibold text-white/80 sm:inline">{site.fullName}</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                  pathname === link.href ? "text-brand-gold" : "text-white/85"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={telHref(site.phones[0].number)}
          className="hidden items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-black transition-transform hover:scale-105 lg:inline-flex"
        >
          <Phone size={16} />
          התקשרו עכשיו
        </a>

        <button
          type="button"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-white lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-brand-black px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/5 text-brand-gold"
                      : "text-white/85 hover:bg-white/5 hover:text-brand-gold"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={telHref(site.phones[0].number)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-black"
          >
            <Phone size={16} />
            התקשרו עכשיו
          </a>
        </div>
      )}
    </header>
  );
}
