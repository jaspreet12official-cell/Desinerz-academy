
import { useState, useEffect, useCallback } from "react";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import { ICONS } from "../../config/icons";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseServices.js";

const initialFormData = {
  name: "",
  category: "",
  fee: "",
  duration: "",
};

export default function CoursesPage() {
  const [courseData, setCourseData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // FETCH COURSES
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getCourses();
      setCourseData(data.courses || []);

    } catch (error) {
      console.error("Fetch courses error:", error);

      setErrorMessage(
        error.response?.data?.message || "Failed to load courses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // LOAD COURSES
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // HANDLE INPUT CHANGE
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

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.fee || Number(formData.fee) <= 0) {
      newErrors.fee = "Enter a valid course fee";
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      newErrors.duration = "Enter a valid duration";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // OPEN ADD MODAL
  const handleAddCourse = () => {
    setIsEditing(false);
    setSelectedCourseId(null);
    setFormData(initialFormData);
    setErrors({});
    setIsModalOpen(true);
  };

  // OPEN EDIT MODAL
  const handleEdit = (course) => {
    setIsEditing(true);
    setSelectedCourseId(course._id);

    setFormData({
      name: course.name || "",
      category: course.category || "",
      fee: course.fee ?? "",
      duration: course.duration ?? "",
    });

    setErrors({});
    setIsModalOpen(true);
  };

  // CREATE / UPDATE COURSE
  const handleSave = async () => {
    if (!validateForm()) return;

    const coursePayload = {
      name: formData.name.trim(),
      category: formData.category,
      fee: Number(formData.fee),
      duration: Number(formData.duration),
    };

    try {
      setSaving(true);

      if (isEditing) {
        // UPDATE EXISTING COURSE
        await updateCourse(selectedCourseId, coursePayload);
      } else {
        // CREATE NEW COURSE
        await createCourse(coursePayload);
      }

      await fetchCourses();

      handleClose();

    } catch (error) {
      console.error("Save course error:", error);

      alert(
        error.response?.data?.message ||
        (isEditing
          ? "Course update failed."
          : "Course creation failed.")
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE COURSE
  const handleDelete = async (course) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteCourse(course._id);

      await fetchCourses();

    } catch (error) {
      console.error("Delete course error:", error);

      alert(
        error.response?.data?.message || "Course deletion failed."
      );
    }
  };

  // CLOSE / DISCARD MODAL
  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedCourseId(null);
    setFormData(initialFormData);
    setErrors({});
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: "name",
      header: "Course Name",
      cellClass: "text-sm font-medium text-gray-800",
    },
    {
      key: "category",
      header: "Category",
      render: (course) => <Badge>{course.category}</Badge>,
    },
    {
      key: "fee",
      header: "Fees",
      render: (course) =>
        `₹${Number(course.fee).toLocaleString("en-IN")}`,
    },
    {
      key: "duration",
      header: "Duration",
      render: (course) => `${course.duration} Months`,
    },
 {
  key: "actions",
  header: "Actions",
  render: (course) => (
    <div className="flex items-center gap-2">

      {/* EDIT */}
      <button
        type="button"
        onClick={() => handleEdit(course)}
        title="Edit Course"
        className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition"
      >
        <FiEdit2 size={17} />
      </button>

      {/* DELETE */}
      <button
        type="button"
        onClick={() => handleDelete(course)}
        title="Delete Course"
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"
      >
        <FiTrash2 size={17} />
      </button>

    </div>
  ),
},
  ];

  return (
    <div className="max-w-5xl space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <SearchInput placeholder="Search courses…" />

        <Button
          icon={ICONS.plus}
          onClick={handleAddCourse}
        >
          Add New Course
        </Button>

      </div>

      {/* COURSES TABLE */}
      {loading ? (
        <p className="text-sm text-gray-500">
          Loading courses...
        </p>
      ) : errorMessage ? (
        <div className="space-y-2">
          <p className="text-sm text-red-500">
            {errorMessage}
          </p>

          <Button onClick={fetchCourses}>
            Retry
          </Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={courseData}
          rowKey="_id"
        />
      )}

      {/* ADD / EDIT COURSE MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={isEditing ? "Edit Course" : "Add New Course"}
        onSave={handleSave}
        onDiscard={handleClose}
        saveText={
          saving
            ? "Saving..."
            : isEditing
              ? "Update Course"
              : "Save Course"
        }
        discardText="Discard"
        size="max-w-xl"
      >

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

          <InputField
            label="Duration (Months)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            required
            error={errors.duration}
          />

        </div>

      </Modal>

    </div>
  );
}
