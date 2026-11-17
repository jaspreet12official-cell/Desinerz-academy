
import express from "express";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "../controllers/adminController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/login", adminLogin);

// Protected routes
router.get("/me", requireAdmin, getAdminProfile);
router.post("/logout", requireAdmin, adminLogout);

export default router;



