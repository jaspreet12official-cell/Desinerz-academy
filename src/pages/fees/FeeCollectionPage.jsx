import { useState } from "react";
import { Card, Select, Button, DataTable, Icon } from "../../components/ui";
import { ICONS } from "../../config/icons";
import { fmt } from "../../utils/format";

const paymentLedger = [
  { date: "2024-02-10", amount: 15000, receipt: "R24-001", student: "Amit Verma", course: "Graphic Designing" },
  { date: "2024-04-18", amount: 15000, receipt: "R24-002", student: "Amit Verma", course: "Graphic Designing" },
  { date: "2024-06-05", amount: 12000, receipt: "R24-003", student: "Nisha Gupta", course: "Digital Marketing" },
  { date: "2024-08-22", amount: 20000, receipt: "R24-004", student: "Karan Mehra", course: "Web Development" },
  { date: "2024-09-14", amount: 18000, receipt: "R24-005", student: "Nisha Gupta", course: "Digital Marketing" },
  { date: "2024-11-30", amount: 10000, receipt: "R24-006", student: "Karan Mehra", course: "Web Development" },
  { date: "2025-01-08", amount: 25000, receipt: "R25-001", student: "Priya Kapoor", course: "UI/UX Designing" },
  { date: "2025-02-20", amount: 15000, receipt: "R25-002", student: "Rahul Sharma", course: "Graphic Designing" },
  { date: "2025-03-11", amount: 20000, receipt: "R25-003", student: "Anjali Nair", course: "Web Development" },
  { date: "2025-04-25", amount: 15000, receipt: "R25-004", student: "Priya Kapoor", course: "UI/UX Designing" },
  { date: "2025-05-09", amount: 15000, receipt: "R25-005", student: "Rahul Sharma", course: "Graphic Designing" },
  { date: "2025-06-30", amount: 30000, receipt: "R25-006", student: "Vikram Tiwari", course: "Digital Marketing" },
  { date: "2025-08-14", amount: 30000, receipt: "R25-007", student: "Anjali Nair", course: "Web Development" },
  { date: "2025-09-01", amount: 15000, receipt: "R25-008", student: "Vikram Tiwari", course: "Digital Marketing" },
  { date: "2025-10-17", amount: 10000, receipt: "R25-009", student: "Sneha Mehta", course: "Power BI" },
  { date: "2025-11-28", amount: 5000, receipt: "R25-010", student: "Sneha Mehta", course: "Power BI" },
  { date: "2025-12-05", amount: 22000, receipt: "R25-011", student: "Rahul Sharma", course: "Graphic Designing" },
  { date: "2026-01-15", amount: 40000, receipt: "R26-001", student: "Priya Kapoor", course: "UI/UX Designing" },
  { date: "2026-02-10", amount: 15000, receipt: "R26-002", student: "Rahul Sharma", course: "Graphic Designing" },
  { date: "2026-03-03", amount: 25000, receipt: "R26-003", student: "Anjali Nair", course: "Web Development" },
  { date: "2026-04-19", amount: 45000, receipt: "R26-004", student: "Vikram Tiwari", course: "Digital Marketing" },
  { date: "2026-05-22", amount: 15000, receipt: "R26-005", student: "Sneha Mehta", course: "Power BI" },
  { date: "2026-06-07", amount: 15000, receipt: "R26-006", student: "Anjali Nair", course: "Web Development" },
  { date: "2026-07-11", amount: 30000, receipt: "R26-007", student: "Rahul Sharma", course: "Graphic Designing" },
  { date: "2026-08-05", amount: 15000, receipt: "R26-008", student: "Sneha Mehta", course: "Power BI" },
  { date: "2026-09-01", amount: 10000, receipt: "R26-009", student: "Anjali Nair", course: "Web Development" },
  { date: "2026-09-12", amount: 20000, receipt: "R26-010", student: "Vikram Tiwari", course: "Digital Marketing" },
  // Future — 2026 YTD mein nahi aana chahiye
  { date: "2026-10-01", amount: 18000, receipt: "R26-011", student: "Priya Kapoor", course: "UI/UX Designing" },
  { date: "2026-12-15", amount: 22000, receipt: "R26-012", student: "Rahul Sharma", course: "Graphic Designing" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const yearOf = (p) => new Date(p.date).getFullYear();
const monthOf = (p) => new Date(p.date).getMonth();
const sum = (list) => list.reduce((s, p) => s + p.amount, 0);

const columns = [
  { key: "date", header: "Date", nowrap: true, cellClass: "text-sm text-gray-500", render: (p) => longDate(new Date(p.date)) },
  { key: "receipt", header: "Receipt No.", cellClass: "text-xs font-mono text-gray-500" },
  { key: "student", header: "Student", cellClass: "text-sm font-medium text-gray-800" },
  { key: "course", header: "Course", cellClass: "text-sm text-gray-500" },
  { key: "amount", header: "Amount", align: "right", cellClass: "text-sm font-semibold", render: (p) => <span style={{ color: "#16A34A" }}>{fmt(p.amount)}</span> },
];

// Is page ka local KPI card (sirf yahin use hota hai)
function KpiCard({ icon, color, label, children }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col gap-1" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + "12" }}>
          <Icon path={icon} size={15} style={{ color }} />
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
      </div>
      {children}
    </div>
  );
}

function KpiTotal({ value, caption, stats }) {
  return (
    <>
      <div className="text-3xl font-bold tracking-tight" style={{ color: "#1A1D21" }}>{value}</div>
      <div className="text-xs text-gray-400">{caption}</div>
      <div className="mt-3 pt-3 border-t flex items-center gap-4" style={{ borderColor: "#F3F4F6" }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-xs text-gray-400">{s.label}</div>
            <div className="text-sm font-semibold text-gray-700">{s.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function FeeCollectionPage() {
  const today = new Date("2026-09-13"); // TODO: backend ke baad new Date()
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(null);

  const isCurrentYear = year === today.getFullYear();
  const cutoff = isCurrentYear ? today : new Date(year, 11, 31);

  const ytd = paymentLedger.filter((p) => yearOf(p) === year && new Date(p.date) <= cutoff);
  const ytdTotal = sum(ytd);
  const inMonth = month === null ? [] : paymentLedger.filter((p) => yearOf(p) === year && monthOf(p) === month);
  const monthTotal = sum(inMonth);

  const years = [...new Set(paymentLedger.map(yearOf))].sort((a, b) => b - a);
  const months = [...new Set(paymentLedger.filter((p) => yearOf(p) === year).map(monthOf))].sort((a, b) => a - b);

  const monthly = MONTHS.map((label, i) => ({ label, total: sum(ytd.filter((p) => monthOf(p) === i)) }));
  const maxMonthly = Math.max(...monthly.map((m) => m.total), 1);

  const byCourse = {};
  ytd.forEach((p) => { byCourse[p.course] = (byCourse[p.course] ?? 0) + p.amount; });
  const topCourses = Object.entries(byCourse).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const topVal = topCourses[0]?.[1] ?? 1;

  const rows = [...(month !== null ? inMonth : ytd)].sort((a, b) => new Date(b.date) - new Date(a.date));
  const period = month !== null ? `${MONTHS[month]} ${year}` : `${year} YTD`;

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select
          label="Year"
          value={year}
          onChange={(e) => { setYear(Number(e.target.value)); setMonth(null); }}
          options={years.map((y) => ({ value: y, label: y }))}
        />
        <Select
          label="Month"
          value={month ?? ""}
          onChange={(e) => setMonth(e.target.value === "" ? null : Number(e.target.value))}
          options={[{ value: "", label: "All months" }, ...months.map((i) => ({ value: i, label: MONTHS[i] }))]}
        />
        {month !== null && <Button variant="link" className="self-end mb-2.5" onClick={() => setMonth(null)}>Clear month</Button>}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard icon={ICONS.feeCollection} color="#4F46E5" label={`${isCurrentYear ? "Year-to-Date" : "Full Year"} · ${year}`}>
          <KpiTotal
            value={fmt(ytdTotal)}
            caption={isCurrentYear ? `Through ${longDate(today)}` : `Jan – Dec ${year}`}
            stats={[
              { label: "Payments", value: ytd.length },
              { label: "Avg / payment", value: ytd.length ? fmt(Math.round(ytdTotal / ytd.length)) : "—" },
            ]}
          />
        </KpiCard>

        {month !== null ? (
          <KpiCard icon={ICONS.events} color="#16A34A" label={`${MONTHS[month]} ${year}`}>
            <KpiTotal
              value={fmt(monthTotal)}
              caption={`Collected in ${MONTHS[month]}`}
              stats={[
                { label: "Payments", value: inMonth.length },
                { label: "Share of YTD", value: ytdTotal ? `${((monthTotal / ytdTotal) * 100).toFixed(1)}%` : "—" },
              ]}
            />
          </KpiCard>
        ) : (
          <div className="rounded-xl border-2 border-dashed p-5 flex flex-col items-center justify-center gap-2 text-center" style={{ borderColor: "#E5E7EB" }}>
            <Icon path={ICONS.events} size={20} className="text-gray-300" />
            <p className="text-xs text-gray-400 font-medium">Select a month<br />to see monthly total</p>
          </div>
        )}

        <KpiCard icon={ICONS.courses} color="#D97706" label={`By Course · ${year}`}>
          <div className="space-y-2.5">
            {topCourses.map(([course, total]) => (
              <div key={course}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs text-gray-600 truncate max-w-[140px]">{course}</span>
                  <span className="text-xs font-semibold text-gray-700">{fmt(total)}</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(total / topVal) * 100}%`, background: "linear-gradient(90deg, #D97706, #F59E0B)" }} />
                </div>
              </div>
            ))}
          </div>
        </KpiCard>
      </div>

      {/* Monthly chart */}
      <Card title={`Monthly Collection — ${year}`} actions={<span className="text-xs text-gray-400">Showing payments ≤ {longDate(cutoff)}</span>}>
        <div className="flex items-end gap-1.5 h-36">
          {monthly.map(({ label, total }, i) => {
            const selected = month === i;
            const pct = (total / maxMonthly) * 100;
            return (
              <button key={label} onClick={() => setMonth(selected ? null : i)} className="flex-1 flex flex-col items-center gap-1 group" title={`${label}: ${fmt(total)}`}>
                <div className="w-full flex items-end justify-center" style={{ height: 112 }}>
                  <div
                    className="w-full rounded-t transition-all duration-200"
                    style={{
                      height: total > 0 ? `${Math.max(pct, 4)}%` : "2px",
                      background: selected ? "#4F46E5" : total > 0 ? "linear-gradient(180deg, #6366F1, #818CF8)" : "#F3F4F6",
                      opacity: month !== null && !selected ? 0.4 : 1,
                    }}
                  />
                </div>
                <span className={`text-xs font-medium transition-colors ${selected ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Payment records */}
      <DataTable
        title={<>Payment Records — {period}<span className="ml-2 text-xs font-normal text-gray-400">({rows.length} records)</span></>}
        headerActions={<Button variant="outline" icon={ICONS.download}>Export CSV</Button>}
        columns={columns}
        data={rows}
        rowKey="receipt"
        footer={
          <tr className="border-t" style={{ borderColor: "#E5E7EB" }}>
            <td colSpan={4} className="px-4 py-3 text-sm font-semibold text-gray-600">Total</td>
            <td className="px-4 py-3 text-sm font-bold text-right" style={{ color: "#4F46E5" }}>{fmt(month !== null ? monthTotal : ytdTotal)}</td>
          </tr>
        }
      />
    </div>
  );
}
