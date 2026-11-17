
import Admin from "../models/Admin.js";

export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session?.adminId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const admin = await Admin.findById(req.session.adminId);

    if (!admin || !admin.isActive) {
      req.session.destroy(() => {});

      return res.status(401).json({
        success: false,
        message: "Admin access denied",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
