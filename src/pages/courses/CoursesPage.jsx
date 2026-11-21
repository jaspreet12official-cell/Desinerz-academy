
import { useState, useEffect, useCallback } from "react";

import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import { ICONS } from "../../config/icons";

import {
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
   getCourseUploadUrl,
} from "../../services/courseServices.js";

const initialFormData = {
  name: "",
  category: "",
  fee: "",
  duration: "",
};

export default function CoursesPage() {
  const [courseData, setCourseData] = useState([]);
  const [categories, setCategories] = useState([]);

  // COURSE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
const [existingUpload, setExistingUpload] = useState(null);
const [fileError, setFileError] = useState("");

  // CATEGORY MODALS
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState(false);

  const [isManageCategoriesOpen, setIsManageCategoriesOpen] =
    useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [viewedCategory, setViewedCategory] = useState(null);

  // LOADING STATES
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // FETCH COURSES
  // ==========================================

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getCourses();

      setCourseData(data.courses || []);
    } catch (error) {
      console.error("Fetch courses error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to load courses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = useCallback(async () => {
    try {
      setCategoryLoading(true);

      const data = await getCategories();

      setCategories(data.categories || []);
    } catch (error) {
      console.error("Fetch categories error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setCategoryLoading(false);
    }
  }, []);

  // LOAD DATA
  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, [fetchCourses, fetchCategories]);

  // ==========================================
  // COURSE FORM
  // ==========================================

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

    if (
      !formData.duration ||
      Number(formData.duration) <= 0
    ) {
      newErrors.duration = "Enter a valid duration";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
  const file = e.target.files?.[0];

  setFileError("");
  setSelectedFile(null);

  if (!file) return;

  const isPdf =
    file.type === "application/pdf" &&
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    setFileError("Only PDF files are allowed.");
    e.target.value = "";
    return;
  }

  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {
    setFileError("PDF size must be 10 MB or less.");
    e.target.value = "";
    return;
  }

  setSelectedFile(file);
};
  // OPEN ADD COURSE MODAL
  const handleAddCourse = () => {
    if (categories.length === 0) {
      alert("Please create a category first.");
      setIsCategoryModalOpen(true);
      return;
    }

    setIsEditing(false);
    setSelectedCourseId(null);
    setFormData(initialFormData);
    setErrors({});
    setIsModalOpen(true);
    setSelectedFile(null);
setExistingUpload(null);
setFileError("");
  };

  // OPEN EDIT COURSE MODAL
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

  if (fileError) return;

  const coursePayload = new FormData();

  coursePayload.append("name", formData.name.trim());
  coursePayload.append("category", formData.category);
  coursePayload.append("fee", Number(formData.fee));
  coursePayload.append("duration", Number(formData.duration));

  if (selectedFile) {
    coursePayload.append("upload", selectedFile);
  }

  try {
    setSaving(true);

    if (isEditing) {
      await updateCourse(
        selectedCourseId,
        coursePayload
      );
    } else {
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
        error.response?.data?.message ||
          "Course deletion failed."
      );
    }
  };

  // CLOSE COURSE MODAL
  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedCourseId(null);
    setFormData(initialFormData);
    setErrors({});
    setSelectedFile(null);
setExistingUpload(null);
setFileError("");
  };

  // CREATE CATEGORY
  

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      setCategoryError("Category name is required");
      return;
    }

    try {
      setSaving(true);
      setCategoryError("");

      await createCategory({
        name: categoryName.trim(),
      });

      await fetchCategories();

      setCategoryName("");
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error("Create category error:", error);

      setCategoryError(
        error.response?.data?.message ||
          "Category creation failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // VIEW CATEGORY
  // ==========================================

  const handleViewCategory = async (category) => {
    try {
      const data = await getCategoryById(category._id);

      setViewedCategory(data);
    } catch (error) {
      console.error("View category error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to view category."
      );
    }
  };

  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteCategory(category._id);

      await fetchCategories();

      setViewedCategory(null);
    } catch (error) {
      console.error("Delete category error:", error);

      alert(
        error.response?.data?.message ||
          "Category deletion failed."
      );
    }
  };

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const columns = [
    {
      key: "name",
      header: "Course Name",
      cellClass: "text-sm font-medium text-gray-800",
    },
    {
      key: "category",
      header: "Category",
      render: (course) => (
        <Badge>{course.category}</Badge>
      ),
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
      render: (course) =>
        `${course.duration} Months`,
    },
    {
  key: "upload",
  header: "Uploads",
  render: (course) =>
    course.upload?.fileName ? (
      <a
        href={getCourseUploadUrl(course._id)}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-purple-600 hover:underline"
        title={course.upload.originalName || "Open PDF"}
      >
        {course.upload.originalName || "View PDF"}
      </a>
    ) : (
      <span className="text-sm text-gray-400">
        —
      </span>
    ),
},
    {
      key: "actions",
      header: "Actions",
      render: (course) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEdit(course)}
            title="Edit Course"
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition"
          >
            <FiEdit2 size={17} />
          </button>

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

  // CATEGORY OPTIONS FOR COURSE FORM
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  return (
    <div className="max-w-5xl space-y-4">

      {/* TOP TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <SearchInput placeholder="Search courses…" />

        <div className="flex flex-wrap items-center gap-2">

          <Button
            onClick={() => {
              setViewedCategory(null);
              setIsManageCategoriesOpen(true);
            }}
          >
            Manage Categories
          </Button>

          <Button
            onClick={() => {
              setCategoryName("");
              setCategoryError("");
              setIsCategoryModalOpen(true);
            }}
          >
            + Create Category
          </Button>

          <Button
            icon={ICONS.plus}
            onClick={handleAddCourse}
          >
            Add New Course
          </Button>

        </div>
      </div>

      {/* CATEGORY CHIPS */}
      {categoryLoading ? (
        <p className="text-sm text-gray-500">
          Loading categories...
        </p>
      ) : categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category._id}>
              {category.name}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No categories created yet.
        </p>
      )}

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

      {/* ===================================== */}
      {/* CREATE CATEGORY MODAL */}
      {/* ===================================== */}

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Create Category"
        onSave={handleCreateCategory}
        onDiscard={() => setIsCategoryModalOpen(false)}
        saveText={saving ? "Saving..." : "Save Category"}
        discardText="Discard"
        size="max-w-md"
      >
        <div className="space-y-4">
          <InputField
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setCategoryError("");
            }}
            placeholder="Enter category name"
            required
            error={categoryError}
          />
        </div>
      </Modal>

      {/* ===================================== */}
      {/* MANAGE CATEGORIES MODAL */}
      {/* ===================================== */}

      <Modal
        isOpen={isManageCategoriesOpen}
        onClose={() => {
          setIsManageCategoriesOpen(false);
          setViewedCategory(null);
        }}
        title="Manage Categories"
        onSave={() => {
          setIsManageCategoriesOpen(false);
          setViewedCategory(null);
        }}
        onDiscard={() => {
          setIsManageCategoriesOpen(false);
          setViewedCategory(null);
        }}
        saveText="Done"
        discardText="Close"
        size="max-w-xl"
      >
        <div className="space-y-4">

          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">
              No categories available.
            </p>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between gap-3 border border-gray-200 rounded-lg p-3"
              >
                <span className="text-sm font-medium text-gray-800">
                  {category.name}
                </span>

                <div className="flex items-center gap-2">

                  {/* VIEW CATEGORY */}
                  <button
                    type="button"
                    onClick={() =>
                      handleViewCategory(category)
                    }
                    title="View Category"
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition"
                  >
                    <FiEye size={17} />
                  </button>

                  {/* DELETE CATEGORY */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteCategory(category)
                    }
                    title="Delete Category"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"
                  >
                    <FiTrash2 size={17} />
                  </button>

                </div>
              </div>
            ))
          )}

          {/* CATEGORY DETAILS */}
          {viewedCategory && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800">
                {viewedCategory.category?.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {viewedCategory.count || 0} courses in this category
              </p>

              {viewedCategory.courses?.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {viewedCategory.courses.map((course) => (
                    <div
                      key={course._id}
                      className="text-sm text-gray-700 bg-gray-50 rounded-md px-3 py-2"
                    >
                      {course.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-3">
                  No courses in this category yet.
                </p>
              )}
            </div>
          )}

        </div>
      </Modal>

      {/* ===================================== */}
      {/* ADD / EDIT COURSE MODAL */}
      {/* ===================================== */}

         {/* ===================================== */}
      {/* ADD / EDIT COURSE MODAL */}
      {/* ===================================== */}

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
            placeholder={
              categories.length === 0
                ? "Create a category first"
                : "Select category"
            }
            required
            error={errors.category}
            options={categoryOptions}
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

          {/* OPTIONAL COURSE PDF UPLOAD */}
          <div className="sm:col-span-2 space-y-2">

            <label className="block text-sm font-medium text-gray-700">
              Course PDF{" "}
              <span className="text-gray-400 font-normal">
                (Optional)
              </span>
            </label>

            {/* EXISTING PDF */}
            {existingUpload && !selectedFile && (
              <div className="text-sm text-gray-600">
                Current file:{" "}

                <a
                  href={getCourseUploadUrl(selectedCourseId)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  {existingUpload.originalName || "View PDF"}
                </a>
              </div>
            )}

            {/* FILE INPUT */}
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
                border border-gray-200 rounded-md p-2"
            />

            <p className="text-xs text-gray-500">
              PDF only. Maximum file size: 10 MB.
            </p>

            {/* SELECTED FILE */}
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name}
              </p>
            )}

            {/* FILE VALIDATION ERROR */}
            {fileError && (
              <p className="text-sm text-red-500">
                {fileError}
              </p>
            )}

          </div>

        </div>
      </Modal>


    </div>
  );
}
