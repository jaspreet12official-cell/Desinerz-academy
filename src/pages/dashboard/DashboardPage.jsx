import { Card, Badge, Avatar, StatCard, Icon } from "../../components/ui";
import { ICONS } from "../../config/icons";

const stats = [
  { label: "Total Students", value: "21", delta: "+4 this month", icon: ICONS.students, color: "#4F46E5" },
  { label: "Total Courses", value: "4", delta: "+1 new", icon: ICONS.courses, color: "#7C3AED" },
  { label: "Enrollment Requests", value: "19", delta: "+7 this week", icon: ICONS.enrollment, color: "#0EA5E9" },
  { label: "Get In Touch", value: "6", delta: "+2 today", icon: ICONS.touch, color: "#D97706" },
];

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

const quickStats = [
  { label: "Design Courses", value: 19, icon: ICONS.courses, color: "#4F46E5" },
  { label: "Digital Marketing", value: 2, icon: ICONS.courses, color: "#0EA5E9" },
  { label: "Total Universities", value: 0, icon: ICONS.university, color: "#7C3AED" },
  { label: "Council Members", value: 2, icon: ICONS.council, color: "#16A34A" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3" title="Courses by Category" actions={<Badge>21 total</Badge>}>
          <div className="space-y-3.5">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">{c.name}</span>
                  <span className="text-xs font-semibold text-gray-800">{c.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${c.pct}%`, background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-2" title="Recent Activity">
          <div className="space-y-3">
            {recentActivity.map((a) => (
              <div key={a.name} className="flex items-start gap-3">
                <Avatar initials={a.initials} color={a.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-medium">{a.name}</span> {a.action} <span className="text-indigo-600 font-medium">{a.course}</span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((s) => (
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
