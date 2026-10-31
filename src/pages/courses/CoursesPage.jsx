import { Button, SearchInput, DataTable, Badge, StarRating } from "../../components/ui";
import { ICONS } from "../../config/icons";

const courseData = [
  { name: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop", fee: "₹45,000", rating: 5, category: "Marketing" },
  { name: "UI/UX Designing", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=60&h=60&fit=crop", fee: "₹45,000", rating: 5, category: "Design" },
  { name: "Graphic Designing", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=60&h=60&fit=crop", fee: "₹55,000", rating: 4, category: "Design" },
  { name: "Web Development", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop", fee: "₹60,000", rating: 4, category: "Tech" },
];

const columns = [
  { key: "img", header: "Image", render: (c) => <img src={c.img} alt={c.name} className="w-10 h-10 rounded-lg object-cover" /> },
  { key: "name", header: "Name", cellClass: "text-sm font-medium text-gray-800" },
  { key: "category", header: "Category", render: (c) => <Badge>{c.category}</Badge> },
  { key: "fee", header: "Fees", cellClass: "text-sm font-medium text-gray-700" },
  { key: "rating", header: "Rating", render: (c) => <StarRating rating={c.rating} /> },
];

export default function CoursesPage() {
  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Search courses…" />
        <Button icon={ICONS.plus}>Add New Course</Button>
      </div>
      <DataTable columns={columns} data={courseData} rowKey="name" actions />
    </div>
  );
}
