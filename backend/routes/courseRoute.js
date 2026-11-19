
import express from "express";

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { requireAdmin  } from "../middleware/authMiddleware.js";

const router = express.Router();

// All course routes are accessible only to authenticated admins
router.use(requireAdmin);

// CREATE COURSE
router.post("/", createCourse);

// GET ALL COURSES
router.get("/", getAllCourses);

// GET SINGLE COURSE
router.get("/:id", getCourseById);

// UPDATE COURSE
router.put("/:id", updateCourse);

// DELETE COURSE
router.delete("/:id", deleteCourse);

export default router;
