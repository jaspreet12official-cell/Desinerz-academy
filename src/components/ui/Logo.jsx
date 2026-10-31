export default function Logo() {
  return (
    <div className="flex items-center gap-2 px-5 py-4">
      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
        <span className="text-white font-bold text-base leading-none">D</span>
      </div>
      <div>
        <div className="font-bold text-sm leading-none" style={{ color: "#1A1D21" }}>Desinerz</div>
        <div className="text-xs tracking-widest font-medium" style={{ color: "#9CA3AF", fontSize: 9 }}>ACADEMY</div>
      </div>
    </div>
  );
}
