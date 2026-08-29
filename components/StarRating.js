import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5 text-brand-gold" aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < rating ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}
