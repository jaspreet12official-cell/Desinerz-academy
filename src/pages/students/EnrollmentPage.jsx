
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  SearchInput,
  DataTable,
  Avatar,
} from "../../components/ui";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiFileText,
  FiX,
} from "react-icons/fi";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";

import { getCourses } from "../../services/courseServices.js";

const statusTabs = [
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Inactive", value: "Inactive" },
];

const initialForm = {
  registrationNo: "",
  name: "",
  email: "",
  phone: "",
  parentName: "",
  parentContact: "",
  aadhaarNo: "",
  courseId: "",
  enrollmentDate: "",
  status: "Active",
};

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700";

    case "Pending":
      return "bg-amber-50 text-amber-700";

    case "Inactive":
      return "bg-gray-100 text-gray-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getInitials = (name = "") => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateForInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

export default function EnrollmentPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [counts, setCounts] = useState({
    Active: 0,
    Pending: 0,
    Inactive: 0,
  });

  const [modalMode, setModalMode] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  // ==========================================
  // LOAD COURSES
  // ==========================================

  const loadCourses = useCallback(async () => {
    try {
      const response = await getCourses();

      setCourses(response.courses || []);
    } catch (error) {
      console.error("Courses loading error:", error);
    }
  }, []);

  // ==========================================
  // LOAD STUDENTS + STATUS COUNTS
  // ==========================================

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [studentResponse, activeResponse, pendingResponse, inactiveResponse] =
        await Promise.all([
          getStudents({
            status: activeTab,
            search: search.trim(),
          }),

          getStudents({ status: "Active" }),
          getStudents({ status: "Pending" }),
          getStudents({ status: "Inactive" }),
        ]);

      setStudents(studentResponse.students || []);

      setCounts({
        Active: activeResponse.count || 0,
        Pending: pendingResponse.count || 0,
        Inactive: inactiveResponse.count || 0,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load students"
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // ==========================================
  // MODAL HANDLERS
  // ==========================================

  const closeModal = () => {
    setModalMode("");
    setSelectedStudent(null);
    setFormData(initialForm);
    setError("");
  };

  const openCreateModal = () => {
    setSelectedStudent(null);
    setFormData(initialForm);
    setError("");
    setModalMode("create");
  };

  // VIEW STUDENT
  const openViewModal = async (student) => {
    try {
      setError("");

      const response = await getStudentById(student._id);

      setSelectedStudent(response.student);
      setModalMode("view");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load student details"
      );
    }
  };

  // EDIT STUDENT
  const openEditModal = async (student) => {
    try {
      setError("");

      const response = await getStudentById(student._id);

      const data = response.student;

      setSelectedStudent(data);

      setFormData({
        registrationNo: data.registrationNo || "",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        parentName: data.parentName || "",
        parentContact: data.parentContact || "",
        aadhaarNo: data.aadhaarNo || "",
        courseId: data.courseId?._id || data.courseId || "",
        enrollmentDate: formatDateForInput(data.enrollmentDate),
        status: data.status || "Active",
      });

      setModalMode("edit");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load student for editing"
      );
    }
  };

  // DELETE STUDENT
  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setError("");
    setModalMode("delete");
  };

  // ==========================================
  // FORM HANDLERS
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        enrollmentDate: formData.enrollmentDate || undefined,
      };

      if (modalMode === "create") {
        await createStudent(payload);
      }

      if (modalMode === "edit") {
        await updateStudent(selectedStudent._id, payload);
      }

      closeModal();
      await loadStudents();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save student"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      setError("");

      await deleteStudent(selectedStudent._id);

      closeModal();
      await loadStudents();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete student"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const columns = [
    {
      key: "registrationNo",
      header: "Reg No.",
      cellClass: "text-xs font-mono text-gray-500",
    },

    {
      key: "name",
      header: "Student",
      render: (student) => (
        <div className="flex items-center gap-2.5">
          <Avatar
            initials={getInitials(student.name)}
            color="#7C3AED"
          />

          <div>
            <p className="text-sm font-medium text-gray-800">
              {student.name}
            </p>

            <p className="text-xs text-gray-500">
              {student.phone}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "courseId",
      header: "Course",
      render: (student) => (
        <span className="text-sm text-gray-600">
          {student.courseId?.name || "—"}
        </span>
      ),
    },

    {
      key: "enrollmentDate",
      header: "Enrollment Date",
      render: (student) => (
        <span className="text-sm text-gray-500">
          {formatDate(student.enrollmentDate) || "—"}
        </span>
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (student) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
            student.status
          )}`}
        >
          {student.status}
        </span>
      ),
    },

    {
      key: "feeStructure",
      header: "Fee Structure",
      render: (student) => (
        <button
          type="button"
          onClick={() =>
            navigate(`/admin/fee-structure/${student._id}`)
          }
          className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 hover:text-violet-900"
        >
          <FiFileText size={15} />
          View Fee
        </button>
      ),
    },

    {
      key: "actions",
      header: "Actions",
      render: (student) => (
        <div className="flex items-center gap-1">
          {/* VIEW */}
          <button
            type="button"
            title="View Student"
            onClick={() => openViewModal(student)}
            className="rounded-md p-2 text-gray-500 hover:bg-violet-50 hover:text-violet-700"
          >
            <FiEye size={17} />
          </button>

          {/* EDIT */}
          <button
            type="button"
            title="Edit Student"
            onClick={() => openEditModal(student)}
            className="rounded-md p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-700"
          >
            <FiEdit2 size={17} />
          </button>

          {/* DELETE */}
          <button
            type="button"
            title="Delete Student"
            onClick={() => openDeleteModal(student)}
            className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      ),
    },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="max-w-6xl space-y-4">

      {/* TOP TOOLBAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search by name or contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          icon="plus"
          onClick={openCreateModal}
        >
          Add Student
        </Button>
      </div>

      {/* STATUS TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200">
        {statusTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "border-violet-600 text-violet-700"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[tab.value]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ERROR */}
      {error && !modalMode && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* STUDENT TABLE */}
      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Loading students...
        </div>
      ) : students.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="text-sm font-medium text-gray-700">
            No students found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try another search or select a different status.
          </p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={students}
          rowKey="_id"
        />
      )}

      {/* ======================================
          STUDENT MODAL
      ====================================== */}

      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {modalMode === "create" && "Add Student"}
                  {modalMode === "view" && "Student Details"}
                  {modalMode === "edit" && "Edit Student"}
                  {modalMode === "delete" && "Delete Student"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {modalMode === "view" &&
                    "Student information (read-only)"}

                  {modalMode === "edit" &&
                    "Update student information"}

                  {modalMode === "create" &&
                    "Enter student information"}

                  {modalMode === "delete" &&
                    "Confirm student deletion"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* MODAL ERROR */}
            {error && (
              <div className="mx-6 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* VIEW MODAL */}
            {modalMode === "view" && selectedStudent && (
              <>
                <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
                  <div className="mb-5 flex items-center gap-3">
                    <Avatar
                      initials={getInitials(selectedStudent.name)}
                      color="#7C3AED"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {selectedStudent.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {selectedStudent.registrationNo}
                      </p>
                    </div>

                    <span
                      className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        selectedStudent.status
                      )}`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      [
                        "Registration Number",
                        selectedStudent.registrationNo,
                      ],
                      ["Student Name", selectedStudent.name],
                      ["Email", selectedStudent.email],
                      ["Contact Number", selectedStudent.phone],
                      ["Parent Name", selectedStudent.parentName],
                      [
                        "Parent Contact",
                        selectedStudent.parentContact,
                      ],
                      [
                        "Aadhaar Number",
                        selectedStudent.aadhaarNo,
                      ],
                      [
                        "Course",
                        selectedStudent.courseId?.name,
                      ],
                      [
                        "Enrollment Date",
                        formatDate(selectedStudent.enrollmentDate),
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        <p className="mb-1 text-xs text-gray-500">
                          {label}
                        </p>

                        <p className="break-words text-sm font-medium text-gray-800">
                          {value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-200 px-6 py-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {/* CREATE / EDIT MODAL */}
            {(modalMode === "create" || modalMode === "edit") && (
              <form onSubmit={handleSubmit}>
                <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* REGISTRATION NUMBER */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Registration Number *
                      </label>

                      <input
                        name="registrationNo"
                        value={formData.registrationNo}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter registration number"
                      />
                    </div>

                    {/* NAME */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Student Name *
                      </label>

                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter student name"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter email"
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Contact Number *
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter contact number"
                      />
                    </div>

                    {/* PARENT NAME */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Parent Name *
                      </label>

                      <input
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter parent name"
                      />
                    </div>

                    {/* PARENT CONTACT */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Parent Contact *
                      </label>

                      <input
                        type="tel"
                        name="parentContact"
                        value={formData.parentContact}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="Enter parent contact"
                      />
                    </div>

                    {/* AADHAAR */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Aadhaar Number *
                      </label>

                      <input
                        type="text"
                        name="aadhaarNo"
                        value={formData.aadhaarNo}
                        onChange={handleChange}
                        required
                        maxLength={12}
                        pattern="[0-9]{12}"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        placeholder="12-digit Aadhaar number"
                      />
                    </div>

                    {/* COURSE */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Course *
                      </label>

                      <select
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                      >
                        <option value="">
                          Select Course
                        </option>

                        {courses.map((course) => (
                          <option
                            key={course._id}
                            value={course._id}
                          >
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ENROLLMENT DATE */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Enrollment Date
                      </label>

                      <input
                        type="date"
                        name="enrollmentDate"
                        value={formData.enrollmentDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>

                    {/* STATUS */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Status *
                      </label>

                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* FORM FOOTER */}
                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : modalMode === "create"
                      ? "Create Student"
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {modalMode === "delete" && selectedStudent && (
              <>
                <div className="px-6 py-6">
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-800">
                      {selectedStudent.name}
                    </span>
                    ?
                  </p>

                  <p className="mt-2 text-sm text-red-600">
                    This action cannot be undone.
                  </p>
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {saving ? "Deleting..." : "Delete Student"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
