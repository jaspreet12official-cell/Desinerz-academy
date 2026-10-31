import { Button, DataTable, Badge } from "../../components/ui";
import { ICONS } from "../../config/icons";

const subjectData = [
  { name: "Typography Fundamentals", code: "DES-101", course: "Graphic Designing" },
  { name: "Color Theory", code: "DES-102", course: "Graphic Designing" },
  { name: "User Research Methods", code: "UX-201", course: "UI/UX Designing" },
  { name: "Wireframing & Prototyping", code: "UX-202", course: "UI/UX Designing" },
  { name: "SEO & Content Strategy", code: "DM-301", course: "Digital Marketing" },
  { name: "React Fundamentals", code: "WD-401", course: "Web Development" },
];

const columns = [
  { key: "name", header: "Subject Name", cellClass: "text-sm font-medium text-gray-800" },
  { key: "code", header: "Code", render: (s) => <Badge variant="code">{s.code}</Badge> },
  { key: "course", header: "Course", cellClass: "text-sm text-gray-500" },
];

export default function SubjectsPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add Subject</Button>
      </div>
      <DataTable columns={columns} data={subjectData} rowKey="code" actions />
    </div>
  );
}
