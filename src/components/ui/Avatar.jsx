/** color: hex or any CSS background (gradient too) */
export default function Avatar({ initials, color = "#4F46E5" }) {
  return (
    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold" style={{ background: color }}>
      {initials}
    </div>
  );
}
