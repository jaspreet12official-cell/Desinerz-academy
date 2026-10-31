import { DataTable, Badge } from "../../components/ui";

const certData = [
  { name: "Priya Kapoor", course: "UI/UX Designing", issued: "15 Jun 2026", valid: true },
  { name: "Rahul Sharma", course: "Graphic Designing", issued: "20 Jun 2026", valid: true },
  { name: "Anjali Nair", course: "Web Development", issued: "01 Jul 2026", valid: false },
  { name: "Vikram Tiwari", course: "Digital Marketing", issued: "10 Jul 2026", valid: true },
];

const columns = [
  { key: "name", header: "Student", cellClass: "text-sm font-medium text-gray-800" },
  { key: "course", header: "Course", cellClass: "text-sm text-gray-600" },
  { key: "issued", header: "Issued", cellClass: "text-sm text-gray-500" },
  { key: "valid", header: "Status", render: (c) => <Badge variant={c.valid ? "success" : "danger"}>{c.valid ? "Valid" : "Invalid"}</Badge> },
];

const filterTabs = (
  <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "#E5E7EB" }}>
    {["All", "Valid", "Invalid"].map((f) => (
      <button key={f} className="px-3 py-1 text-xs font-medium hover:bg-gray-50 transition-colors" style={{ color: "#6B7280" }}>{f}</button>
    ))}
  </div>
);

export default function CertificatePage() {
  return (
    <div className="max-w-4xl space-y-4">
      <DataTable title="Certificate Validity" headerActions={filterTabs} columns={columns} data={certData} rowKey="name" actions deleteLabel="Revoke" />
    </div>
  );
}
