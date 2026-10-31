import { SearchInput, Button, DataTable } from "../../components/ui";
import { ICONS } from "../../config/icons";
import { fmt } from "../../utils/format";

const feeData = [
  { name: "Priya Kapoor", course: "UI/UX Designing", phone: "9820012345", receipt: "RCP-001", total: 45000, discount: 5000, final: 40000, paid: 40000, dues: 0, lastPaid: "10 Aug 2026" },
  { name: "Rahul Sharma", course: "Graphic Designing", phone: "9876543210", receipt: "RCP-002", total: 55000, discount: 0, final: 55000, paid: 30000, dues: 25000, lastPaid: "15 Jul 2026" },
  { name: "Anjali Nair", course: "Web Development", phone: "9112233445", receipt: "RCP-003", total: 60000, discount: 10000, final: 50000, paid: 25000, dues: 25000, lastPaid: "01 Jul 2026" },
  { name: "Vikram Tiwari", course: "Digital Marketing", phone: "9988776655", receipt: "RCP-004", total: 45000, discount: 0, final: 45000, paid: 45000, dues: 0, lastPaid: "20 Jun 2026" },
  { name: "Sneha Mehta", course: "Power BI", phone: "9765432100", receipt: "RCP-005", total: 35000, discount: 2000, final: 33000, paid: 15000, dues: 18000, lastPaid: "05 Sep 2026" },
];

// amount ya "—" (zero hone par), optional color ke saath
const money = (key, color) => (row) =>
  row[key] > 0 ? <span style={color ? { color } : undefined}>{fmt(row[key])}</span> : <span style={{ color: "#9CA3AF" }}>—</span>;

const columns = [
  { key: "name", header: "Name", nowrap: true, cellClass: "text-sm font-medium text-gray-800" },
  { key: "course", header: "Course", nowrap: true, cellClass: "text-sm text-gray-600" },
  { key: "phone", header: "Phone", nowrap: true, cellClass: "text-sm text-gray-500" },
  { key: "receipt", header: "Receipt No.", nowrap: true, cellClass: "text-xs font-mono text-gray-500" },
  { key: "total", header: "Total Fees", nowrap: true, align: "right", cellClass: "text-sm text-gray-700 font-medium", render: (r) => fmt(r.total) },
  { key: "discount", header: "Discount", nowrap: true, align: "right", cellClass: "text-sm text-gray-500", render: money("discount") },
  { key: "final", header: "Final Amount", nowrap: true, align: "right", cellClass: "text-sm font-semibold text-gray-800", render: (r) => fmt(r.final) },
  { key: "paid", header: "Paid", nowrap: true, align: "right", cellClass: "text-sm font-medium", render: money("paid", "#16A34A") },
  { key: "dues", header: "Dues", nowrap: true, align: "right", cellClass: "text-sm font-medium", render: money("dues", "#DC2626") },
  { key: "lastPaid", header: "Last Paid", nowrap: true, cellClass: "text-xs text-gray-400" },
];

export default function FeeStructurePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Search students…" />
        <Button variant="outline" icon={ICONS.download}>Export</Button>
      </div>
      <DataTable columns={columns} data={feeData} rowKey="receipt" scroll />
    </div>
  );
}
