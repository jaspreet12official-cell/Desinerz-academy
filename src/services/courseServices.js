
import api from "./api";

// Get all courses
export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

// Get single course
export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

// Create course
export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

// Update course
export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

// Delete course
export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

// Get course PDF URL
export const getCourseUploadUrl = (id) => {
  const baseURL = api.defaults.baseURL || "/api";

  return `${baseURL.replace(/\/$/, "")}/courses/${id}/upload`;
};

// ==========================================
// CATEGORY SERVICES
// ==========================================

// Get all categories
export const getCategories = async () => {
  const response = await api.get("/courses/categories");
  return response.data;
};

// Create category
export const createCategory = async (categoryData) => {
  const response = await api.post(
    "/courses/categories",
    categoryData
  );

  return response.data;
};

// Get single category with its courses
export const getCategoryById = async (id) => {
  const response = await api.get(
    `/courses/categories/${id}`
  );

  return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const response = await api.delete(
    `/courses/categories/${id}`
  );

  return response.data;
};
