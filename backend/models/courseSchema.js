
import mongoose from "mongoose";

// CATEGORY SUBDOCUMENT
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// COURSE SCHEMA
const courseSchema = new mongoose.Schema(
  {
    recordType: {
      type: String,
      enum: ["course", "categoryRegistry"],
      default: "course",
    },

    name: {
      type: String,
      required: function () {
        return this.recordType === "course";
      },
      trim: true,
    },

    category: {
      type: String,
      required: function () {
        return this.recordType === "course";
      },
      trim: true,
    },

    categories: {
      type: [categorySchema],
      default: undefined,
    },

    fee: {
      type: Number,
      required: function () {
        return this.recordType === "course";
      },
      min: 1,
    },

    duration: {
      type: Number,
      required: function () {
        return this.recordType === "course";
      },
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

