import { useState } from "react";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import StarRating from "../../components/ui/StarRating";
import {ICONS} from "../../config/icons";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
// Initial Course Data
const initialCourseData = [
  {
    name: "Digital Marketing",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop",
    fee: "₹45,000",
    rating: 5,
    category: "Marketing",
  },
  {
    name: "UI/UX Designing",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=60&h=60&fit=crop",
    fee: "₹45,000",
    rating: 5,
    category: "Design",
  },
  {
    name: "Graphic Designing",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=60&h=60&fit=crop",
    fee: "₹55,000",
    rating: 4,
    category: "Design",
  },
  {
    name: "Web Development",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop",
    fee: "₹60,000",
    rating: 4,
    category: "Tech",
  },
];

// Table Columns
const columns = [
  {
    key: "img",
    header: "Image",
    render: (c) => (
      <img
        src={c.img}
        alt={c.name}
        className="w-10 h-10 rounded-lg object-cover"
      />
    ),
  },
  {
    key: "name",
    header: "Name",
    cellClass: "text-sm font-medium text-gray-800",
  },
  {
    key: "category",
    header: "Category",
    render: (c) => <Badge>{c.category}</Badge>,
  },
  {
    key: "fee",
    header: "Fees",
    cellClass: "text-sm font-medium text-gray-700",
  },
  {
    key: "rating",
    header: "Rating",
    render: (c) => <StarRating rating={c.rating} />,
  },
];

const initialFormData = {
  name: "",
  category: "",
  fee: "",
};

export default function CoursesPage() {
  const [courseData, setCourseData] = useState(initialCourseData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.fee || Number(formData.fee) <= 0) {
      newErrors.fee = "Please enter a valid course fee";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save Course
  const handleSave = () => {
    if (!validateForm()) return;

    const newCourse = {
      name: formData.name.trim(),
      category: formData.category,
      fee: `₹${Number(formData.fee).toLocaleString("en-IN")}`,
      rating: 5,
      img: initialCourseData[0].img,
    };

    setCourseData((prev) => [...prev, newCourse]);

    setFormData(initialFormData);
    setErrors({});
    setIsModalOpen(false);
  };

  // Discard Form
  const handleDiscard = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  // Close Modal
  const handleClose = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="max-w-5xl space-y-4">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <SearchInput placeholder="Search courses…" />

        <Button
          icon={ICONS.plus}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Course
        </Button>

      </div>

      {/* Courses Table */}
      <DataTable
        columns={columns}
        data={courseData}
        rowKey="name"
        actions
      />

      {/* Reusable Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Add New Course"
        onSave={handleSave}
        onDiscard={handleDiscard}
        saveText="Save Course"
        discardText="Discard"
        size="max-w-xl"
      >

        {/* Modal Body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <InputField
            label="Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter course name"
            required
            error={errors.name}
          />

          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Select category"
            required
            error={errors.category}
            options={[
              { label: "Marketing", value: "Marketing" },
              { label: "Design", value: "Design" },
              { label: "Tech", value: "Tech" },
              { label: "Business", value: "Business" },
            ]}
          />

          <InputField
            label="Course Fees"
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleChange}
            placeholder="Enter course fees"
            required
            error={errors.fee}
          />

        </div>

      </Modal>

    </div>
  );
}
