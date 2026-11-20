
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    registrationNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentContact: {
      type: String,
      required: true,
      trim: true,
    },

    aadhaarNo: {
      type: String,
      required: true,
      select: false,
      trim: true,
      validate: {
        validator: (value) => /^\d{12}$/.test(value),
        message: "Aadhaar number must contain exactly 12 digits",
      },
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    enrollmentDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
