export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="border-b border-brand-gold/20 bg-brand-black px-5 py-16 text-center text-white lg:py-20">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold tracking-widest text-brand-gold">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">{description}</p>
        )}
      </div>
    </section>
  );
}
