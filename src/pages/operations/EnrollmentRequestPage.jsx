import { Button, DataTable } from "../../components/ui";
import { ICONS } from "../../config/icons";

const data = [
  { name: "Aman Joshi", course: "Graphic Design", phone: "9771234567", date: "12 Sep 2026", status: "Pending" },
  { name: "Divya Singh", course: "Web Dev", phone: "9887654321", date: "13 Sep 2026", status: "Reviewed" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "course", header: "Course" },
  { key: "phone", header: "Phone" },
  { key: "date", header: "Date" },
  { key: "status", header: "Status" },
];

export default function EnrollmentRequestPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add Request</Button>
      </div>
      <DataTable columns={columns} data={data} rowKey="phone" actions />
    </div>
  );
}
