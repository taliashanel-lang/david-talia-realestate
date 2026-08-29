import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function ServiceCard({ service, href }) {
  const Icon = Icons[service.icon] ?? Icons.Home;

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/40 hover:shadow-xl">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-black text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-brand-black">
        <Icon size={26} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-brand-black">{service.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-6 text-black/60">{service.short}</p>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black transition-colors group-hover:text-brand-gold"
        >
          לפרטים נוספים
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}
