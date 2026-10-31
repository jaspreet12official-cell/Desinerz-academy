export default function Icon({ path, size = 16, className = "", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d={path} />
    </svg>
  );
}
