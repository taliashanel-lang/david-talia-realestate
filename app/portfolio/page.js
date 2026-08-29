import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PortfolioGrid from "@/components/PortfolioGrid";
import { site } from "@/lib/site";

export const metadata = {
  title: "פרויקטים",
  description: `תיק העבודות של ${site.fullName} — מכירה, השכרה, נכסים מסחריים ופרויקטים חדשים.`,
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="תיק עבודות"
        title="הפרויקטים שלנו"
        description="מבחר עסקאות וסוגי נכסים שליווינו — לדוגמה בלבד, ומתעדכן בהתאם לנכסים הפעילים."
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <PortfolioGrid />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
