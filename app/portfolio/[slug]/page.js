import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { projects, getProjectBySlug, unsplashUrl } from "@/data/projects";
import { site, telHref } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative flex h-[50vh] min-h-[360px] items-end overflow-hidden bg-brand-black text-white">
        <Image
          src={unsplashUrl(project.image, { width: 1800 })}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 lg:px-8">
          <span className="mb-3 inline-block rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-black">
            {project.categoryLabel}
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-2 text-white/70">{project.area}</p>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-brand-black">אודות העסקה</h2>
            <p className="mb-8 text-base leading-7 text-black/65">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery.map((img) => (
                <div key={img} className="relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src={unsplashUrl(img, { width: 700 })}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="rounded-2xl bg-brand-black p-8 text-white">
              <h3 className="mb-2 text-lg font-bold">מתעניינים בנכס דומה?</h3>
              <p className="mb-6 text-sm leading-6 text-white/70">
                נשמח לעזור לכם למצוא או לשווק נכס בסגנון דומה. השאירו פרטים ונחזור אליכם.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="block w-full rounded-full bg-brand-gold px-5 py-3 text-center text-sm font-semibold text-brand-black transition-transform hover:scale-105"
                >
                  יצירת קשר
                </Link>
                <a
                  href={telHref(site.phones[0].number)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  <Phone size={16} />
                  {site.phones[0].number}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black transition-colors hover:text-brand-gold"
          >
            <ArrowRight size={16} />
            חזרה לכל הפרויקטים
          </Link>
        </div>
      </section>
    </>
  );
}
