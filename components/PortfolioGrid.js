"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { categories, projects } from "@/data/projects";

export default function PortfolioGrid() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              active === cat.slug
                ? "border-brand-gold bg-brand-gold text-brand-black"
                : "border-black/15 text-black/60 hover:border-brand-gold hover:text-brand-black"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-black/50">אין פרויקטים בקטגוריה זו כרגע.</p>
      )}
    </div>
  );
}
