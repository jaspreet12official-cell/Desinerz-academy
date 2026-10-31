import { Button, DataTable } from "../../components/ui";
import { ICONS } from "../../config/icons";

const data = [
  { name: "Dr. Meena Rao", role: "Director", contact: "9900112233" },
  { name: "Mr. Anand Patel", role: "Coordinator", contact: "9811223344" },
];

const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "contact", header: "Contact" },
];

export default function CouncilPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add Member</Button>
      </div>
      <DataTable columns={columns} data={data} rowKey="name" actions />
    </div>
  );
}
