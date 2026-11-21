
import express from "express";

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
   getCourseUpload
} from "../controllers/courseController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.use(requireAdmin);

// CATEGORY ROUTES
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);


// COURSE ROUTES
router.post("/", upload.single("upload"), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload.single("upload"), updateCourse);
router.delete("/:id", deleteCourse);
 router.get("/:id/upload", getCourseUpload);
export default router;

