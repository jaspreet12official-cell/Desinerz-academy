import { useState } from "react";
import { Icon, Logo } from "../components/ui";
import { ICONS } from "../config/icons";
import { navGroups, PAGE_MGMT_IDS, STUDENT_IDS } from "../config/navigation";

function NavItem({ id, label, icon, depth = 0, activePage, setPage }) {
  const isActive = activePage === id;
  return (
    <button
      onClick={() => setPage(id)}
      className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all duration-100 text-left ${isActive ? "sidebar-item-active font-medium" : "sidebar-item text-gray-600 hover:text-gray-900"}`}
      style={{ paddingLeft: depth > 0 ? "2.75rem" : "1.25rem" }}
    >
      <Icon path={icon} size={14} className={isActive ? "text-indigo-600" : "text-gray-400"} />
      <span className="truncate">{label}</span>
    </button>
  );
}

function NavGroupToggle({ item, groupIds, activePage, setPage }) {
  const isActive = groupIds.includes(activePage);
  const [open, setOpen] = useState(isActive);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all duration-100 text-left sidebar-item ${isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
      >
        <Icon path={item.icon} size={14} className={isActive ? "text-indigo-600" : "text-gray-400"} />
        <span className="flex-1 truncate">{item.label}</span>
        <Icon path={open ? ICONS.chevronDown : ICONS.chevronRight} size={12} className="text-gray-400" />
      </button>
      {open && item.sub.map((sub) => (
        <NavItem key={sub.id} {...sub} depth={1} activePage={activePage} setPage={setPage} />
      ))}
    </div>
  );
}

export default function Sidebar({ activePage, setPage }) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r flex flex-col z-20 overflow-y-auto" style={{ borderColor: "#E5E7EB" }}>
      <Logo />
      <div className="border-t" style={{ borderColor: "#F3F4F6" }} />
      <nav className="flex-1 py-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF", fontSize: 10 }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              if (item.id === "page-management")
                return <NavGroupToggle key={item.id} item={item} groupIds={PAGE_MGMT_IDS} activePage={activePage} setPage={setPage} />;
              if (item.id === "students")
                return <NavGroupToggle key={item.id} item={item} groupIds={STUDENT_IDS} activePage={activePage} setPage={setPage} />;
              return <NavItem key={item.id} {...item} activePage={activePage} setPage={setPage} />;
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
