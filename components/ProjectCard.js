import Link from "next/link";
import Image from "next/image";
import { unsplashUrl } from "@/data/projects";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={unsplashUrl(project.image, { width: 900 })}
          alt={project.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute right-3 top-3 rounded-full bg-brand-black/85 px-3 py-1 text-xs font-semibold text-brand-gold">
          {project.categoryLabel}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-gold">
          {project.title}
        </h3>
        <p className="mb-2 text-xs font-medium text-black/40">{project.area}</p>
        <p className="text-sm leading-6 text-black/60">{project.summary}</p>
      </div>
    </Link>
  );
}
