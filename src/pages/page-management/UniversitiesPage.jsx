import { Button, DataTable, StarRating } from "../../components/ui";
import { ICONS } from "../../config/icons";

const universities = [
  { name: "Amity University", img: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=60&h=60&fit=crop", rating: 4 },
  { name: "Symbiosis Institute", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=60&h=60&fit=crop", rating: 5 },
  { name: "NIFT Delhi", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=60&h=60&fit=crop", rating: 4 },
];

const columns = [
  { key: "img", header: "Image", render: (u) => <img src={u.img} alt={u.name} className="w-9 h-9 rounded-md object-cover" /> },
  { key: "name", header: "Name", cellClass: "text-sm font-medium text-gray-800" },
  { key: "rating", header: "Rating", render: (u) => <StarRating rating={u.rating} /> },
];

export default function UniversitiesPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex justify-end">
        <Button icon={ICONS.plus}>Add University</Button>
      </div>
      <DataTable columns={columns} data={universities} rowKey="name" actions />
    </div>
  );
}
