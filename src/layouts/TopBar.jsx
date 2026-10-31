import { useLocation } from "react-router-dom";
import { Icon, Avatar } from "../components/ui";
import { ICONS } from "../config/icons";
import { pageTitles } from "../config/navigation";

export default function TopBar({ theme, setTheme }) {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1] || "dashboard";
  const next = theme === "light" ? "dark" : "light";

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b flex items-center px-6 z-10" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex-1">
        <h1 className="text-lg font-semibold" style={{ color: "#1A1D21" }}>{pageTitles[page] || page}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border rounded-md px-3 py-1.5" style={{ borderColor: "#E5E7EB" }}>
          <Icon path={ICONS.search} size={14} className="text-gray-400" />
          <input placeholder="Search…" className="text-sm bg-transparent outline-none w-44 text-gray-700 placeholder-gray-400" />
        </div>
        <button
          type="button"
          onClick={() => setTheme(next)}
          className="theme-toggle relative p-2 rounded-md hover:bg-gray-50 transition-colors"
          aria-label={`Switch to ${next} mode`}
          title={`Switch to ${next} mode`}
        >
          <Icon path={theme === "light" ? ICONS.moon : ICONS.sun} size={18} className="text-gray-500" />
        </button>
        <button className="relative p-2 rounded-md hover:bg-gray-50 transition-colors">
          <Icon path={ICONS.bell} size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: "#E5E7EB" }}>
          <Avatar initials="A" color="linear-gradient(135deg, #4F46E5, #7C3AED)" />
          <span className="text-sm font-medium text-gray-700">Admin</span>
          <Icon path={ICONS.chevronDown} size={12} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}