import { ICONS } from "../../config/icons";

export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 24 24" fill={i < rating ? "#F59E0B" : "none"} stroke={i < rating ? "#F59E0B" : "#D1D5DB"} strokeWidth={2}>
          <path d={ICONS.star} />
        </svg>
      ))}
    </div>
  );
}
