import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // Validate environment variables
    if (!name || !email || !password) {
      throw new Error("Admin environment variables are missing.");
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists. No duplicate created.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    await Admin.create({
      name,
      email,
      password: hashedPassword,
      isActive: true,
    });

    console.log("Admin created successfully!");
    console.log("Email:", email);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();