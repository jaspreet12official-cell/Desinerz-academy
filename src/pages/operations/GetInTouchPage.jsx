import { Button, DataTable } from "../../components/ui";
import { ICONS } from "../../config/icons";

const data = [
  { name: "Rohan Das", email: "rohan@gmail.com", message: "Interested in UI/UX course", date: "10 Sep 2026" },
  { name: "Kavya M", email: "kavya@email.com", message: "Fee details needed", date: "11 Sep 2026" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "message", header: "Message" },
  { key: "date", header: "Date" },
];

export default function GetInTouchPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add Inquiry</Button>
      </div>
      <DataTable columns={columns} data={data} rowKey="email" actions />
    </div>
  );
}
