
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
} from "../controllers/courseController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAdmin);

// CATEGORY ROUTES
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);

// COURSE ROUTES
router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
