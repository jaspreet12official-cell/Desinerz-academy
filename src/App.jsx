import { useEffect, useState } from "react";

// ─── Icons (inline SVGs) ───────────────────────────────────────────────
const Icon = ({ path, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const ICONS = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  pages: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  courses: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  students: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  certificate: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  subjects: "M4 6h16M4 12h16M4 18h7",
  fee: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  council: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  touch: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  enrollment: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  chevronDown: "M19 9l-7 7-7-7",
  chevronRight: "M9 18l6-6-6-6",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  sun: "M12 3V1m0 22v-2m9-9h2M1 12h2m16.364-7.364l1.414-1.414M3.222 20.778l1.414-1.414m14.728 0l1.414 1.414M3.222 3.222l1.414 1.414M17 12a5 5 0 11-10 0 5 5 0 0110 0z",
  moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  upload: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  trendUp: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  trendDown: "M13 17H5m0 0V9m0 8l8-8 4 4 6-6",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  plus: "M12 4v16m8-8H4",
  filter: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  download: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  about: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  university: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  contact: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  gallery: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  terms: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  events: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  feeCollection: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
};

// ─── Logo ───────────────────────────────────────────────────────────────
const Logo = () => (
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

// ─── Sidebar ────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: ICONS.dashboard }],
  },
  {
    label: "Content",
    items: [
      {
        id: "page-management",
        label: "Page Management",
        icon: ICONS.pages,
        sub: [
          { id: "home-page", label: "Home Page", icon: ICONS.home },
          { id: "about", label: "About Us", icon: ICONS.about },
          { id: "universities", label: "Universities", icon: ICONS.university },
          { id: "contact-us", label: "Contact Us", icon: ICONS.contact },
          { id: "gallery", label: "Gallery", icon: ICONS.gallery },
          { id: "terms", label: "Terms & Conditions", icon: ICONS.terms },
          { id: "privacy", label: "Privacy Policy", icon: ICONS.terms },
          { id: "events", label: "Events", icon: ICONS.events },
        ],
      },
    ],
  },
  {
    label: "Academics",
    items: [
      { id: "courses", label: "Courses", icon: ICONS.courses },
      { id: "enrollment", label: "Students", icon: ICONS.students, sub: [
        { id: "enrollment", label: "Enrollment", icon: ICONS.enrollment },
        { id: "certificate", label: "Certificate", icon: ICONS.certificate },
      ]},
      { id: "subjects", label: "Subjects", icon: ICONS.subjects },
    ],
  },
  {
    label: "Operations",
    items: [
      { id: "fee-structure", label: "Fee Structure", icon: ICONS.fee },
      { id: "fee-collection", label: "Fee Collection", icon: ICONS.feeCollection },
      { id: "council", label: "Council List", icon: ICONS.council },
      { id: "get-in-touch", label: "Get In Touch", icon: ICONS.touch },
      { id: "enrollment-req", label: "Enrollment Request", icon: ICONS.enrollment },
    ],
  },
];

function Sidebar({ activePage, setPage }) {
  const [pagesMgmtOpen, setPagesMgmtOpen] = useState(
    ["home-page","about","universities","contact-us","gallery","terms","privacy","events"].includes(activePage)
  );
  const [studentsOpen, setStudentsOpen] = useState(
    ["enrollment","certificate"].includes(activePage)
  );

  const isPageMgmtActive = ["home-page","about","universities","contact-us","gallery","terms","privacy","events"].includes(activePage);
  const isStudentsActive = ["enrollment","certificate"].includes(activePage);

  const NavItem = ({ id, label, icon, depth = 0 }) => {
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
  };

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
              if (item.id === "page-management") {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setPagesMgmtOpen(!pagesMgmtOpen)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all duration-100 text-left sidebar-item ${isPageMgmtActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Icon path={item.icon} size={14} className={isPageMgmtActive ? "text-indigo-600" : "text-gray-400"} />
                      <span className="flex-1 truncate">{item.label}</span>
                      <Icon path={pagesMgmtOpen ? ICONS.chevronDown : ICONS.chevronRight} size={12} className="text-gray-400" />
                    </button>
                    {pagesMgmtOpen && item.sub?.map((sub) => (
                      <NavItem key={sub.id} id={sub.id} label={sub.label} icon={sub.icon} depth={1} />
                    ))}
                  </div>
                );
              }
              if (item.id === "enrollment" && item.sub) {
                return (
                  <div key="students-group">
                    <button
                      onClick={() => setStudentsOpen(!studentsOpen)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all duration-100 text-left sidebar-item ${isStudentsActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Icon path={item.icon} size={14} className={isStudentsActive ? "text-indigo-600" : "text-gray-400"} />
                      <span className="flex-1 truncate">Students</span>
                      <Icon path={studentsOpen ? ICONS.chevronDown : ICONS.chevronRight} size={12} className="text-gray-400" />
                    </button>
                    {studentsOpen && item.sub.map((sub) => (
                      <NavItem key={sub.id} id={sub.id} label={sub.label} icon={sub.icon} depth={1} />
                    ))}
                  </div>
                );
              }
              return <NavItem key={item.id} id={item.id} label={item.label} icon={item.icon} />;
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── Top Bar ────────────────────────────────────────────────────────────
const pageTitles = {
  dashboard: "Dashboard",
  "home-page": "Home Page",
  about: "About Us",
  universities: "Universities",
  "contact-us": "Contact Us",
  gallery: "Gallery",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  events: "Events",
  courses: "Courses",
  enrollment: "Enrollment",
  certificate: "Certificate",
  subjects: "Subjects",
  "fee-structure": "Fee Structure",
  "fee-collection": "Fee Collection",
  council: "Council List",
  "get-in-touch": "Get In Touch",
  "enrollment-req": "Enrollment Requests",
};

function TopBar({ page, theme, setTheme }) {
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
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme-toggle relative p-2 rounded-md hover:bg-gray-50 transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <Icon path={theme === "light" ? ICONS.moon : ICONS.sun} size={18} className="text-gray-500" />
        </button>
        <button className="relative p-2 rounded-md hover:bg-gray-50 transition-colors">
          <Icon path={ICONS.bell} size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: "#E5E7EB" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>A</div>
          <span className="text-sm font-medium text-gray-700">Admin</span>
          <Icon path={ICONS.chevronDown} size={12} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────
function StatCard({ label, value, delta, trend, icon, color }) {
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

// ─── Dashboard ──────────────────────────────────────────────────────────
const categories = [
  { name: "Design Courses", count: 19, pct: 95 },
  { name: "Digital Marketing", count: 2, pct: 10 },
  { name: "Govt Typing", count: 0, pct: 0 },
  { name: "Development", count: 0, pct: 0 },
  { name: "Computer Basics", count: 0, pct: 0 },
  { name: "Data Analytics", count: 0, pct: 0 },
];

const recentActivity = [
  { initials: "PK", name: "Priya Kapoor", action: "enrolled in", course: "UI/UX Designing", time: "2 min ago", color: "#4F46E5" },
  { initials: "RS", name: "Rahul Sharma", action: "requested info for", course: "Digital Marketing", time: "14 min ago", color: "#7C3AED" },
  { initials: "AN", name: "Anjali Nair", action: "enrolled in", course: "Graphic Designing", time: "1 hr ago", color: "#0EA5E9" },
  { initials: "VT", name: "Vikram Tiwari", action: "Get In Touch inquiry —", course: "Data Analytics", time: "3 hr ago", color: "#D97706" },
  { initials: "SM", name: "Sneha Mehta", action: "enrolled in", course: "Power BI", time: "5 hr ago", color: "#16A34A" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Students" value="21" delta="+4 this month" trend="up" icon={ICONS.students} color="#4F46E5" />
        <StatCard label="Total Courses" value="4" delta="+1 new" trend="up" icon={ICONS.courses} color="#7C3AED" />
        <StatCard label="Enrollment Requests" value="19" delta="+7 this week" trend="up" icon={ICONS.enrollment} color="#0EA5E9" />
        <StatCard label="Get In Touch" value="6" delta="+2 today" trend="up" icon={ICONS.touch} color="#D97706" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Courses by Category */}
        <div className="col-span-3 bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>Courses by Category</h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">21 total</span>
          </div>
          <div className="space-y-3.5">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">{cat.name}</span>
                  <span className="text-xs font-semibold text-gray-800">{cat.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${cat.pct}%`, background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold" style={{ background: item.color }}>
                  {item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-medium">{item.name}</span>{" "}
                    {item.action}{" "}
                    <span className="text-indigo-600 font-medium">{item.course}</span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Design Courses", value: 19, icon: ICONS.courses, color: "#4F46E5" },
          { label: "Digital Marketing", value: 2, icon: ICONS.courses, color: "#0EA5E9" },
          { label: "Total Universities", value: 0, icon: ICONS.university, color: "#7C3AED" },
          { label: "Council Members", value: 2, icon: ICONS.council, color: "#16A34A" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border px-5 py-4 flex items-center gap-4" style={{ borderColor: "#E5E7EB" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "12" }}>
              <Icon path={s.icon} size={15} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: "#1A1D21" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#9CA3AF" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dropzone ──────────────────────────────────────────────────────────
function Dropzone({ label }) {
  return (
    <div className="dropzone">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
          <Icon path={ICONS.upload} size={18} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">Drag & drop or <span className="text-indigo-600 font-medium">browse</span></p>
        </div>
        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );
}

// ─── Image Upload Card ─────────────────────────────────────────────────
function ImageUploadCard({ title, currentSrc }) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: "#F3F4F6" }}>
        <Icon path={ICONS.image} size={15} className="text-indigo-500" />
        <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>{title}</h3>
      </div>
      <div className="p-5 space-y-4">
        {currentSrc && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Current Image</p>
            <div className="rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center h-40" style={{ borderColor: "#E5E7EB" }}>
              <img src={currentSrc} alt="current" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Upload New Image</p>
          <Dropzone label="Drop image here" />
        </div>
        <button className="btn-primary">Upload {title.split(" ")[0]}</button>
      </div>
    </div>
  );
}

// ─── Rich Text Editor ───────────────────────────────────────────────────
function RichEditor({ label, content }) {
  const [text, setText] = useState(content);
  const tools = ["B", "I", "U", "S", "H1", "H2", "UL", "OL", "Lk", "Img", "</>"];
  return (
    <div>
      {label && <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</p>}
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <div className="rich-toolbar">
          {tools.map((t, i) => (
            <button key={i} className="toolbar-btn" title={t}>{t}</button>
          ))}
          <div className="toolbar-divider" />
          <button className="toolbar-btn text-red-400 font-normal">✕</button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-48 px-4 py-3 text-sm text-gray-700 outline-none resize-y"
          style={{ borderTop: "1px solid #F3F4F6" }}
        />
      </div>
    </div>
  );
}

// ─── SEO Card ──────────────────────────────────────────────────────────
function SEOCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon path={ICONS.filter} size={14} className="text-indigo-500" />
          <span className="text-sm font-semibold" style={{ color: "#1A1D21" }}>SEO Settings</span>
        </div>
        <Icon path={open ? ICONS.chevronDown : ICONS.chevronRight} size={14} className="text-gray-400" />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t" style={{ borderColor: "#F3F4F6" }}>
          <div className="pt-3">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meta Title</label>
            <input className="mt-1.5 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" style={{ borderColor: "#E5E7EB" }} placeholder="Enter meta title…" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meta Description</label>
            <textarea className="mt-1.5 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none" style={{ borderColor: "#E5E7EB" }} rows={3} placeholder="Enter meta description…" />
          </div>
          <button className="btn-primary">Save SEO</button>
        </div>
      )}
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <ImageUploadCard title="Header Image" currentSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop&auto=format" />
      <ImageUploadCard title="Footer Image" />
    </div>
  );
}

// ─── About Us ──────────────────────────────────────────────────────────
function AboutUs() {
  const [mediaMode, setMediaMode] = useState("image");
  const aboutContent = `About\n\nWhat is Desinerz Academy?\n\nAt Desinerz Academy, we are more than a coaching centre — we are a nurturing community where students receive personalized guidance and support to choose the right career path from the start of their learning journey. Our focus is on education and creating a family-like environment, where care, encouragement, and personal development are paramount.`;

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Top Body Content</h3>
        <RichEditor label="" content={aboutContent} />
        <button className="btn-primary mt-4">Update Content</button>
      </div>

      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Top Image / Video</h3>
        <div className="flex rounded-lg overflow-hidden border mb-4 w-fit" style={{ borderColor: "#E5E7EB" }}>
          {["image", "video"].map((mode) => (
            <button
              key={mode}
              onClick={() => setMediaMode(mode)}
              className="px-4 py-1.5 text-sm font-medium transition-all"
              style={{
                background: mediaMode === mode ? "#4F46E5" : "white",
                color: mediaMode === mode ? "white" : "#6B7280",
              }}
            >
              {mode === "image" ? "Image" : "Video Link"}
            </button>
          ))}
        </div>
        {mediaMode === "image" ? (
          <Dropzone label="Upload Top Image" />
        ) : (
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            style={{ borderColor: "#E5E7EB" }}
            placeholder="https://youtube.com/embed/…"
          />
        )}
        <button className="btn-primary mt-4">Update Top Section</button>
      </div>

      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Bottom Body Content</h3>
        <RichEditor label="" content="Enter bottom body content here..." />
        <button className="btn-primary mt-4">Update Content</button>
      </div>

      <SEOCard />
    </div>
  );
}

// ─── Universities ──────────────────────────────────────────────────────
const universities = [
  { name: "Amity University", img: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=60&h=60&fit=crop", rating: 4 },
  { name: "Symbiosis Institute", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=60&h=60&fit=crop", rating: 5 },
  { name: "NIFT Delhi", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=60&h=60&fit=crop", rating: 4 },
];

function StarRating({ rating, max = 5 }) {
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

function Universities() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add University
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u) => (
              <tr key={u.name} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3">
                  <img src={u.img} alt={u.name} className="w-9 h-9 rounded-md object-cover" />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{u.name}</td>
                <td className="px-4 py-3"><StarRating rating={u.rating} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Contact Us ────────────────────────────────────────────────────────
function ContactUs() {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Top Contact Content</h3>
        <RichEditor label="" content="Get in touch with us&#10;&#10;Reach Us To Build Your Future" />
        <button className="btn-primary mt-4">Update Content</button>
      </div>

      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Contact Details</h3>
        <div className="space-y-5">
          {[
            { heading: "Phone Number", content: "+91 7419148583" },
            { heading: "Email Address", content: "hello@desinerz.com" },
            { heading: "Office Address", content: "Desinerz Academy, Maharishi Dayanand Digital Campus" },
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 pb-5 border-b last:border-0 last:pb-0" style={{ borderColor: "#F3F4F6" }}>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Heading {i + 1}</label>
                <input defaultValue={item.heading} className="mt-1.5 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" style={{ borderColor: "#E5E7EB" }} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Content {i + 1}</label>
                <input defaultValue={item.content} className="mt-1.5 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" style={{ borderColor: "#E5E7EB" }} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Image {i + 1}</label>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1">
                    <Dropzone label="Drop image or browse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-4">Save Contact Section</button>
      </div>

      <SEOCard />
    </div>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────
const galleryImages = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop",
];

function Gallery() {
  const [images, setImages] = useState(galleryImages);
  return (
    <div className="max-w-5xl space-y-4">
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#1A1D21" }}>Upload Gallery Images</h3>
        <Dropzone label="Drop up to 10 images" />
        <p className="text-xs text-gray-400 mt-2">You can upload up to 10 images at once.</p>
        <button className="btn-primary mt-3">Upload</button>
      </div>

      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>Gallery Images</h3>
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden aspect-video bg-gray-100">
              <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                >
                  <Icon path={ICONS.trash} size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Terms / Privacy ───────────────────────────────────────────────────
function TermsPage({ title }) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "#1A1D21" }}>{title} Content</h3>
        <RichEditor label="" content={`Enter ${title.toLowerCase()} content here...`} />
        <button className="btn-primary mt-4">Save Changes</button>
      </div>
      <SEOCard />
    </div>
  );
}

// ─── Events ────────────────────────────────────────────────────────────
const events = [
  { name: "UI/UX Workshop 2026", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop", date: "Sep 20, 2026" },
  { name: "Design Hackathon", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=60&h=60&fit=crop", date: "Oct 5, 2026" },
];

function Events() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add Event
        </button>
      </div>
      {events.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 flex flex-col items-center gap-3" style={{ borderColor: "#E5E7EB" }}>
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <Icon path={ICONS.events} size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">No events yet — create your first event</p>
          <button className="btn-primary flex items-center gap-2">
            <Icon path={ICONS.plus} size={13} /> Add Event
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.name} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                  <td className="px-4 py-3"><img src={e.img} alt={e.name} className="w-9 h-9 rounded-md object-cover" /></td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{e.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{e.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Courses ───────────────────────────────────────────────────────────
const courseData = [
  { name: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop", fee: "₹45,000", rating: 5, category: "Marketing" },
  { name: "UI/UX Designing", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=60&h=60&fit=crop", fee: "₹45,000", rating: 5, category: "Design" },
  { name: "Graphic Designing", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=60&h=60&fit=crop", fee: "₹55,000", rating: 4, category: "Design" },
  { name: "Web Development", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop", fee: "₹60,000", rating: 4, category: "Tech" },
];

function Courses() {
  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2" style={{ borderColor: "#E5E7EB" }}>
          <Icon path={ICONS.search} size={14} className="text-gray-400" />
          <input placeholder="Search courses…" className="text-sm outline-none w-52 text-gray-700 placeholder-gray-400" />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add New Course
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Fees</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((c) => (
              <tr key={c.name} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3"><img src={c.img} alt={c.name} className="w-10 h-10 rounded-lg object-cover" /></td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">{c.category}</span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">{c.fee}</td>
                <td className="px-4 py-3"><StarRating rating={c.rating} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Enrollment ─────────────────────────────────────────────────────────
const enrollments = [
  { reg: "DA-2026-001", name: "Priya Kapoor", initials: "PK", color: "#4F46E5", course: "UI/UX Designing", dob: "15 Mar 2002", status: "active" },
  { reg: "DA-2026-002", name: "Rahul Sharma", initials: "RS", color: "#7C3AED", course: "Graphic Designing", dob: "22 Jul 2001", status: "active" },
  { reg: "DA-2026-003", name: "Anjali Nair", initials: "AN", color: "#0EA5E9", course: "Web Development", dob: "08 Nov 2003", status: "active" },
  { reg: "DA-2026-004", name: "Vikram Tiwari", initials: "VT", color: "#D97706", course: "Digital Marketing", dob: "30 Apr 2000", status: "pending" },
  { reg: "DA-2026-005", name: "Sneha Mehta", initials: "SM", color: "#16A34A", course: "Power BI", dob: "12 Jan 2002", status: "active" },
];

function Enrollment() {
  const [search, setSearch] = useState("");
  const filtered = enrollments.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2" style={{ borderColor: "#E5E7EB" }}>
          <Icon path={ICONS.search} size={14} className="text-gray-400" />
          <input
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none w-52 text-gray-700 placeholder-gray-400"
          />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add Student
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Reg No.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Course</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Date of Birth</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.reg} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{s.reg}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold" style={{ background: s.color }}>
                      {s.initials}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.course}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{s.dob}</td>
                <td className="px-4 py-3">
                  <span className={s.status === "active" ? "pill-success" : "pill-warning"}>{s.status === "active" ? "Active" : "Pending"}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Certificate ────────────────────────────────────────────────────────
const certData = [
  { name: "Priya Kapoor", course: "UI/UX Designing", issued: "15 Jun 2026", valid: true },
  { name: "Rahul Sharma", course: "Graphic Designing", issued: "20 Jun 2026", valid: true },
  { name: "Anjali Nair", course: "Web Development", issued: "01 Jul 2026", valid: false },
  { name: "Vikram Tiwari", course: "Digital Marketing", issued: "10 Jul 2026", valid: true },
];

function Certificate() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>Certificate Validity</h3>
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "#E5E7EB" }}>
            {["All", "Valid", "Invalid"].map((f) => (
              <button key={f} className="px-3 py-1 text-xs font-medium hover:bg-gray-50 transition-colors" style={{ color: "#6B7280" }}>{f}</button>
            ))}
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Course</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Issued</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certData.map((c) => (
              <tr key={c.name} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.course}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.issued}</td>
                <td className="px-4 py-3">
                  <span className={c.valid ? "pill-success" : "pill-danger"}>{c.valid ? "Valid" : "Invalid"}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-danger">Revoke</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Subjects ──────────────────────────────────────────────────────────
const subjectData = [
  { name: "Typography Fundamentals", code: "DES-101", course: "Graphic Designing" },
  { name: "Color Theory", code: "DES-102", course: "Graphic Designing" },
  { name: "User Research Methods", code: "UX-201", course: "UI/UX Designing" },
  { name: "Wireframing & Prototyping", code: "UX-202", course: "UI/UX Designing" },
  { name: "SEO & Content Strategy", code: "DM-301", course: "Digital Marketing" },
  { name: "React Fundamentals", code: "WD-401", course: "Web Development" },
];

function Subjects() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add Subject
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Subject Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Course</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((s) => (
              <tr key={s.code} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3"><span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{s.code}</span></td>
                <td className="px-4 py-3 text-sm text-gray-500">{s.course}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Fee Structure ──────────────────────────────────────────────────────
const feeData = [
  { name: "Priya Kapoor", course: "UI/UX Designing", phone: "9820012345", receipt: "RCP-001", total: 45000, discount: 5000, final: 40000, paid: 40000, dues: 0, lastPaid: "10 Aug 2026" },
  { name: "Rahul Sharma", course: "Graphic Designing", phone: "9876543210", receipt: "RCP-002", total: 55000, discount: 0, final: 55000, paid: 30000, dues: 25000, lastPaid: "15 Jul 2026" },
  { name: "Anjali Nair", course: "Web Development", phone: "9112233445", receipt: "RCP-003", total: 60000, discount: 10000, final: 50000, paid: 25000, dues: 25000, lastPaid: "01 Jul 2026" },
  { name: "Vikram Tiwari", course: "Digital Marketing", phone: "9988776655", receipt: "RCP-004", total: 45000, discount: 0, final: 45000, paid: 45000, dues: 0, lastPaid: "20 Jun 2026" },
  { name: "Sneha Mehta", course: "Power BI", phone: "9765432100", receipt: "RCP-005", total: 35000, discount: 2000, final: 33000, paid: 15000, dues: 18000, lastPaid: "05 Sep 2026" },
];

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

function FeeStructure() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2" style={{ borderColor: "#E5E7EB" }}>
          <Icon path={ICONS.search} size={14} className="text-gray-400" />
          <input placeholder="Search students…" className="text-sm outline-none w-52 text-gray-700 placeholder-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors font-medium text-gray-600" style={{ borderColor: "#E5E7EB" }}>
            <Icon path={ICONS.download} size={14} className="text-gray-400" />
            Export
            <Icon path={ICONS.chevronDown} size={12} className="text-gray-400" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border overflow-auto" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              {["Name", "Course", "Phone", "Receipt No.", "Total Fees", "Discount", "Final Amount", "Paid", "Dues", "Last Paid"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feeData.map((f) => (
              <tr key={f.receipt} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{f.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{f.course}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{f.phone}</td>
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{f.receipt}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700 font-medium">{fmt(f.total)}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-500">{f.discount > 0 ? fmt(f.discount) : "—"}</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">{fmt(f.final)}</td>
                <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: f.paid > 0 ? "#16A34A" : "#9CA3AF" }}>{f.paid > 0 ? fmt(f.paid) : "—"}</td>
                <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: f.dues > 0 ? "#DC2626" : "#9CA3AF" }}>{f.dues > 0 ? fmt(f.dues) : "—"}</td>
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{f.lastPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Fee Collection ────────────────────────────────────────────────────

// Installment payment records — each has an ISO date string, amount, receipt, and student info
const paymentLedger = [
  // 2024
  { date: "2024-02-10", amount: 15000, receipt: "R24-001", student: "Amit Verma",    course: "Graphic Designing" },
  { date: "2024-04-18", amount: 15000, receipt: "R24-002", student: "Amit Verma",    course: "Graphic Designing" },
  { date: "2024-06-05", amount: 12000, receipt: "R24-003", student: "Nisha Gupta",   course: "Digital Marketing" },
  { date: "2024-08-22", amount: 20000, receipt: "R24-004", student: "Karan Mehra",   course: "Web Development"  },
  { date: "2024-09-14", amount: 18000, receipt: "R24-005", student: "Nisha Gupta",   course: "Digital Marketing" },
  { date: "2024-11-30", amount: 10000, receipt: "R24-006", student: "Karan Mehra",   course: "Web Development"  },
  // 2025
  { date: "2025-01-08", amount: 25000, receipt: "R25-001", student: "Priya Kapoor",  course: "UI/UX Designing"  },
  { date: "2025-02-20", amount: 15000, receipt: "R25-002", student: "Rahul Sharma",  course: "Graphic Designing"},
  { date: "2025-03-11", amount: 20000, receipt: "R25-003", student: "Anjali Nair",   course: "Web Development"  },
  { date: "2025-04-25", amount: 15000, receipt: "R25-004", student: "Priya Kapoor",  course: "UI/UX Designing"  },
  { date: "2025-05-09", amount: 15000, receipt: "R25-005", student: "Rahul Sharma",  course: "Graphic Designing"},
  { date: "2025-06-30", amount: 30000, receipt: "R25-006", student: "Vikram Tiwari", course: "Digital Marketing"},
  { date: "2025-08-14", amount: 30000, receipt: "R25-007", student: "Anjali Nair",   course: "Web Development"  },
  { date: "2025-09-01", amount: 15000, receipt: "R25-008", student: "Vikram Tiwari", course: "Digital Marketing"},
  { date: "2025-10-17", amount: 10000, receipt: "R25-009", student: "Sneha Mehta",   course: "Power BI"         },
  { date: "2025-11-28", amount: 5000,  receipt: "R25-010", student: "Sneha Mehta",   course: "Power BI"         },
  { date: "2025-12-05", amount: 22000, receipt: "R25-011", student: "Rahul Sharma",  course: "Graphic Designing"},
  // 2026 — up to today (13-Sep-2026)
  { date: "2026-01-15", amount: 40000, receipt: "R26-001", student: "Priya Kapoor",  course: "UI/UX Designing"  },
  { date: "2026-02-10", amount: 15000, receipt: "R26-002", student: "Rahul Sharma",  course: "Graphic Designing"},
  { date: "2026-03-03", amount: 25000, receipt: "R26-003", student: "Anjali Nair",   course: "Web Development"  },
  { date: "2026-04-19", amount: 45000, receipt: "R26-004", student: "Vikram Tiwari", course: "Digital Marketing"},
  { date: "2026-05-22", amount: 15000, receipt: "R26-005", student: "Sneha Mehta",   course: "Power BI"         },
  { date: "2026-06-07", amount: 15000, receipt: "R26-006", student: "Anjali Nair",   course: "Web Development"  },
  { date: "2026-07-11", amount: 30000, receipt: "R26-007", student: "Rahul Sharma",  course: "Graphic Designing"},
  { date: "2026-08-05", amount: 15000, receipt: "R26-008", student: "Sneha Mehta",   course: "Power BI"         },
  { date: "2026-09-01", amount: 10000, receipt: "R26-009", student: "Anjali Nair",   course: "Web Development"  },
  { date: "2026-09-12", amount: 20000, receipt: "R26-010", student: "Vikram Tiwari", course: "Digital Marketing"},
  // Future — should NOT appear in YTD for 2026
  { date: "2026-10-01", amount: 18000, receipt: "R26-011", student: "Priya Kapoor",  course: "UI/UX Designing"  },
  { date: "2026-12-15", amount: 22000, receipt: "R26-012", student: "Rahul Sharma",  course: "Graphic Designing"},
];

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function FeeCollection() {
  const today = new Date("2026-09-13"); // current date per AGENTS.md

  // derive available years from ledger
  const availableYears = Array.from(
    new Set(paymentLedger.map((p) => new Date(p.date).getFullYear()))
  ).sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);

  // YTD cutoff: for the current year, cap at today; for past years, Dec 31
  const ytdCutoff =
    selectedYear === today.getFullYear()
      ? today
      : new Date(selectedYear, 11, 31);

  const ytdPayments = paymentLedger.filter((p) => {
    const d = new Date(p.date);
    return d.getFullYear() === selectedYear && d <= ytdCutoff;
  });

  const ytdTotal = ytdPayments.reduce((s, p) => s + p.amount, 0);

  // months that have at least one payment in the selected year
  const availableMonths = Array.from(
    new Set(
      paymentLedger
        .filter((p) => new Date(p.date).getFullYear() === selectedYear)
        .map((p) => new Date(p.date).getMonth())
    )
  ).sort((a, b) => a - b);

  const monthPayments =
    selectedMonth !== null
      ? paymentLedger.filter((p) => {
          const d = new Date(p.date);
          return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
        })
      : [];

  const monthTotal = monthPayments.reduce((s, p) => s + p.amount, 0);

  // monthly breakdown bar chart data for selected year
  const monthlyTotals = MONTH_NAMES.map((_, mi) => {
    const total = ytdPayments
      .filter((p) => new Date(p.date).getMonth() === mi)
      .reduce((s, p) => s + p.amount, 0);
    return { month: MONTH_NAMES[mi], total };
  });
  const maxMonthly = Math.max(...monthlyTotals.map((m) => m.total), 1);

  return (
    <div className="space-y-5 max-w-5xl">

      {/* ── Filters row ── */}
      <div className="flex items-center gap-3">
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => { setSelectedYear(Number(e.target.value)); setSelectedMonth(null); }}
            className="border rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 cursor-pointer"
            style={{ borderColor: "#E5E7EB" }}
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1">Month</label>
          <select
            value={selectedMonth ?? ""}
            onChange={(e) => setSelectedMonth(e.target.value === "" ? null : Number(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: "#E5E7EB" }}
          >
            <option value="">All months</option>
            {availableMonths.map((mi) => (
              <option key={mi} value={mi}>{MONTH_NAMES[mi]}</option>
            ))}
          </select>
        </div>

        {(selectedMonth !== null) && (
          <button
            onClick={() => setSelectedMonth(null)}
            className="self-end mb-0.5 text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
          >
            Clear month
          </button>
        )}
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* YTD total */}
        <div className="col-span-1 bg-white rounded-xl border p-5 flex flex-col gap-1" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#4F46E512" }}>
              <Icon path={ICONS.feeCollection} size={15} style={{ color: "#4F46E5" }} />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {selectedYear === today.getFullYear() ? "Year-to-Date" : "Full Year"} · {selectedYear}
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight" style={{ color: "#1A1D21" }}>{fmt(ytdTotal)}</div>
          <div className="text-xs text-gray-400">
            {selectedYear === today.getFullYear()
              ? `Through ${today.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
              : `Jan – Dec ${selectedYear}`}
          </div>
          <div className="mt-3 pt-3 border-t flex items-center gap-4" style={{ borderColor: "#F3F4F6" }}>
            <div>
              <div className="text-xs text-gray-400">Payments</div>
              <div className="text-sm font-semibold text-gray-700">{ytdPayments.length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Avg / payment</div>
              <div className="text-sm font-semibold text-gray-700">
                {ytdPayments.length ? fmt(Math.round(ytdTotal / ytdPayments.length)) : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Month total — shown only when a month is selected */}
        {selectedMonth !== null ? (
          <div className="col-span-1 bg-white rounded-xl border p-5 flex flex-col gap-1" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#16A34A12" }}>
                <Icon path={ICONS.events} size={15} style={{ color: "#16A34A" }} />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {MONTH_NAMES[selectedMonth]} {selectedYear}
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight" style={{ color: "#1A1D21" }}>{fmt(monthTotal)}</div>
            <div className="text-xs text-gray-400">Collected in {MONTH_NAMES[selectedMonth]}</div>
            <div className="mt-3 pt-3 border-t flex items-center gap-4" style={{ borderColor: "#F3F4F6" }}>
              <div>
                <div className="text-xs text-gray-400">Payments</div>
                <div className="text-sm font-semibold text-gray-700">{monthPayments.length}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Share of YTD</div>
                <div className="text-sm font-semibold text-gray-700">
                  {ytdTotal ? `${((monthTotal / ytdTotal) * 100).toFixed(1)}%` : "—"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-1 rounded-xl border-2 border-dashed p-5 flex flex-col items-center justify-center gap-2 text-center" style={{ borderColor: "#E5E7EB" }}>
            <Icon path={ICONS.events} size={20} className="text-gray-300" />
            <p className="text-xs text-gray-400 font-medium">Select a month<br />to see monthly total</p>
          </div>
        )}

        {/* Top course by collection */}
        <div className="col-span-1 bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D9770612" }}>
              <Icon path={ICONS.courses} size={15} style={{ color: "#D97706" }} />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">By Course · {selectedYear}</span>
          </div>
          <div className="space-y-2.5">
            {(() => {
              const byC = {};
              ytdPayments.forEach((p) => { byC[p.course] = (byC[p.course] ?? 0) + p.amount; });
              const sorted = Object.entries(byC).sort((a, b) => b[1] - a[1]);
              const topVal = sorted[0]?.[1] ?? 1;
              return sorted.slice(0, 4).map(([course, total]) => (
                <div key={course}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs text-gray-600 truncate max-w-[140px]">{course}</span>
                    <span className="text-xs font-semibold text-gray-700">{fmt(total)}</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(total / topVal) * 100}%`, background: "linear-gradient(90deg, #D97706, #F59E0B)" }} />
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* ── Monthly bar chart ── */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>Monthly Collection — {selectedYear}</h3>
          <span className="text-xs text-gray-400">Showing payments ≤ {ytdCutoff.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <div className="flex items-end gap-1.5 h-36">
          {monthlyTotals.map(({ month, total }, mi) => {
            const isSelected = selectedMonth === mi;
            const pct = (total / maxMonthly) * 100;
            return (
              <button
                key={month}
                onClick={() => setSelectedMonth(isSelected ? null : mi)}
                className="flex-1 flex flex-col items-center gap-1 group"
                title={`${month}: ${fmt(total)}`}
              >
                <div className="w-full flex items-end justify-center" style={{ height: 112 }}>
                  <div
                    className="w-full rounded-t transition-all duration-200"
                    style={{
                      height: total > 0 ? `${Math.max(pct, 4)}%` : "2px",
                      background: isSelected
                        ? "#4F46E5"
                        : total > 0
                        ? "linear-gradient(180deg, #6366F1, #818CF8)"
                        : "#F3F4F6",
                      opacity: selectedMonth !== null && !isSelected ? 0.4 : 1,
                    }}
                  />
                </div>
                <span className={`text-xs font-medium transition-colors ${isSelected ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Payment ledger table ── */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>
            Payment Records
            {selectedMonth !== null
              ? ` — ${MONTH_NAMES[selectedMonth]} ${selectedYear}`
              : ` — ${selectedYear} YTD`}
            <span className="ml-2 text-xs font-normal text-gray-400">({(selectedMonth !== null ? monthPayments : ytdPayments).length} records)</span>
          </h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors font-medium text-gray-600" style={{ borderColor: "#E5E7EB" }}>
            <Icon path={ICONS.download} size={13} className="text-gray-400" />
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Receipt No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Course</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(selectedMonth !== null ? monthPayments : ytdPayments)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((p) => (
                  <tr key={p.receipt} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.receipt}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{p.student}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.course}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-right" style={{ color: "#16A34A" }}>{fmt(p.amount)}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="border-t" style={{ borderColor: "#E5E7EB" }}>
                <td colSpan={4} className="px-4 py-3 text-sm font-semibold text-gray-600">Total</td>
                <td className="px-4 py-3 text-sm font-bold text-right" style={{ color: "#4F46E5" }}>
                  {fmt(selectedMonth !== null ? monthTotal : ytdTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Generic List Page ─────────────────────────────────────────────────
function GenericListPage({ title, columns, data }) {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Icon path={ICONS.plus} size={14} />
          Add {title}
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">{c}</th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-sm text-gray-700">{cell}</td>
                ))}
                <td className="px-4 py-3 flex gap-2">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── App Shell ─────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("desinerz-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("desinerz-theme", theme);
  }, [theme]);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "home-page": return <HomePage />;
      case "about": return <AboutUs />;
      case "universities": return <Universities />;
      case "contact-us": return <ContactUs />;
      case "gallery": return <Gallery />;
      case "terms": return <TermsPage title="Terms & Conditions" />;
      case "privacy": return <TermsPage title="Privacy Policy" />;
      case "events": return <Events />;
      case "courses": return <Courses />;
      case "enrollment": return <Enrollment />;
      case "certificate": return <Certificate />;
      case "subjects": return <Subjects />;
      case "fee-structure": return <FeeStructure />;
      case "fee-collection": return <FeeCollection />;
      case "council":
        return <GenericListPage title="Member" columns={["Name", "Role", "Contact"]} data={[["Dr. Meena Rao", "Director", "9900112233"], ["Mr. Anand Patel", "Coordinator", "9811223344"]]} />;
      case "get-in-touch":
        return <GenericListPage title="Inquiry" columns={["Name", "Email", "Message", "Date"]} data={[["Rohan Das", "rohan@gmail.com", "Interested in UI/UX course", "10 Sep 2026"], ["Kavya M", "kavya@email.com", "Fee details needed", "11 Sep 2026"]]} />;
      case "enrollment-req":
        return <GenericListPage title="Request" columns={["Name", "Course", "Phone", "Date", "Status"]} data={[["Aman Joshi", "Graphic Design", "9771234567", "12 Sep 2026", "Pending"], ["Divya Singh", "Web Dev", "9887654321", "13 Sep 2026", "Reviewed"]]} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="theme-shell min-h-screen" style={{ background: "#F7F8FA" }}>
      <Sidebar activePage={page} setPage={setPage} />
      <TopBar page={page} theme={theme} setTheme={setTheme} />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
