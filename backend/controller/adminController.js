
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    req.session.adminId = admin._id.toString();

    req.session.save((error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Session could not be created",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// ADMIN LOGOUT
export const adminLogout = (req, res) => {
  if (!req.session) {
    return res.status(200).json({
      success: true,
      message: "Already logged out",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    res.clearCookie("desinerz.sid");

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  });
};

// GET LOGGED-IN ADMIN
export const getAdminProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
    },
  });
};
