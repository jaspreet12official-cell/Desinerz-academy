import { Button, DataTable, Icon } from "../../components/ui";
import { ICONS } from "../../config/icons";

const events = [
  { name: "UI/UX Workshop 2026", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop", date: "Sep 20, 2026" },
  { name: "Design Hackathon", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=60&h=60&fit=crop", date: "Oct 5, 2026" },
];

const columns = [
  { key: "img", header: "Image", render: (e) => <img src={e.img} alt={e.name} className="w-9 h-9 rounded-md object-cover" /> },
  { key: "name", header: "Name", cellClass: "text-sm font-medium text-gray-800" },
  { key: "date", header: "Date", cellClass: "text-sm text-gray-500" },
];

const emptyState = (
  <div className="bg-white rounded-xl border p-16 flex flex-col items-center gap-3" style={{ borderColor: "#E5E7EB" }}>
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <Icon path={ICONS.events} size={22} className="text-gray-300" />
    </div>
    <p className="text-sm font-medium text-gray-500">No events yet — create your first event</p>
    <Button icon={ICONS.plus}>Add Event</Button>
  </div>
);

export default function EventsPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add Event</Button>
      </div>
      <DataTable columns={columns} data={events} rowKey="name" actions empty={emptyState} />
    </div>
  );
}
