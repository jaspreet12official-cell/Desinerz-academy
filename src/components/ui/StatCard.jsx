import Icon from "./Icon";
import { ICONS } from "../../config/icons";

export default function StatCard({ label, value, delta, trend = "up", icon, color }) {
  return (
    <div className="bg-white rounded-xl border p-5 stat-card transition-shadow" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>
          <Icon path={icon} size={16} style={{ color }} />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-500"}`}>
          <Icon path={trend === "up" ? ICONS.trendUp : ICONS.trendDown} size={11} />
          {delta}
        </span>
      </div>
      <div className="text-2xl font-bold mb-0.5" style={{ color: "#1A1D21" }}>{value}</div>
      <div className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{label}</div>
    </div>
  );
}
