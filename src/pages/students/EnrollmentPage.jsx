import { useState } from "react";
import { Button, SearchInput, DataTable, Avatar, Badge } from "../../components/ui";
import { ICONS } from "../../config/icons";

const enrollments = [
  { reg: "DA-2026-001", name: "Priya Kapoor", initials: "PK", color: "#4F46E5", course: "UI/UX Designing", dob: "15 Mar 2002", status: "active" },
  { reg: "DA-2026-002", name: "Rahul Sharma", initials: "RS", color: "#7C3AED", course: "Graphic Designing", dob: "22 Jul 2001", status: "active" },
  { reg: "DA-2026-003", name: "Anjali Nair", initials: "AN", color: "#0EA5E9", course: "Web Development", dob: "08 Nov 2003", status: "active" },
  { reg: "DA-2026-004", name: "Vikram Tiwari", initials: "VT", color: "#D97706", course: "Digital Marketing", dob: "30 Apr 2000", status: "pending" },
  { reg: "DA-2026-005", name: "Sneha Mehta", initials: "SM", color: "#16A34A", course: "Power BI", dob: "12 Jan 2002", status: "active" },
];

const columns = [
  { key: "reg", header: "Reg No.", cellClass: "text-xs font-mono text-gray-500" },
  {
    key: "name",
    header: "Student",
    render: (s) => (
      <div className="flex items-center gap-2.5">
        <Avatar initials={s.initials} color={s.color} />
        <span className="text-sm font-medium text-gray-800">{s.name}</span>
      </div>
    ),
  },
  { key: "course", header: "Course", cellClass: "text-sm text-gray-600" },
  { key: "dob", header: "Date of Birth", cellClass: "text-sm text-gray-500" },
  { key: "status", header: "Status", render: (s) => <Badge variant={s.status === "active" ? "success" : "warning"}>{s.status === "active" ? "Active" : "Pending"}</Badge> },
];

export default function EnrollmentPage() {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = enrollments.filter((e) => e.name.toLowerCase().includes(q) || e.course.toLowerCase().includes(q));

  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Search students…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button icon={ICONS.plus}>Add Student</Button>
      </div>
      <DataTable columns={columns} data={filtered} rowKey="reg" actions />
    </div>
  );
}
