
import Course from "../models/courseSchema.js";

import fs from "fs/promises";
import path from "path";
// HELPER: GET CATEGORY REGISTRY
const getCategoryRegistry = async () => {
  let registry = await Course.findOne({
    recordType: "categoryRegistry",
  });

  if (!registry) {
    try {
      registry = await Course.create({
        recordType: "categoryRegistry",
        categories: [],
      });
    } catch (error) {
      // Handle simultaneous first-time requests
      if (error.code === 11000) {
        registry = await Course.findOne({
          recordType: "categoryRegistry",
        });
      } else {
        throw error;
      }
    }
  }

  return registry;
};

// ==========================================
// CATEGORY MANAGEMENT
// ==========================================

// 1. CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const registry = await getCategoryRegistry();

    const categoryName = name.trim();

    const existingCategory = registry.categories.find(
      (category) =>
        category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    registry.categories.push({
      name: categoryName,
    });

    await registry.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: registry.categories[registry.categories.length - 1],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const registry = await getCategoryRegistry();

    return res.status(200).json({
      success: true,
      count: registry.categories.length,
      categories: registry.categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. VIEW SINGLE CATEGORY
export const getCategoryById = async (req, res) => {
  try {
    const registry = await getCategoryRegistry();

    const category = registry.categories.id(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const courses = await Course.find({
      $and: [
        { category: category.name },
        {
          $or: [
            { recordType: "course" },
            { recordType: { $exists: false } },
          ],
        },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      category,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const registry = await getCategoryRegistry();

    const category = registry.categories.id(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const existingCourse = await Course.findOne({
      $and: [
        { category: category.name },
        {
          $or: [
            { recordType: "course" },
            { recordType: { $exists: false } },
          ],
        },
      ],
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message:
          "This category contains courses. Move or delete those courses before deleting the category.",
      });
    }

    registry.categories.pull(req.params.id);

    await registry.save();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// COURSE MANAGEMENT
// ==========================================

// 1. CREATE COURSE

export const createCourse = async (req, res) => {
  try {
    const { name, category, fee, duration } = req.body;

    const registry = await getCategoryRegistry();

    const categoryExists = registry.categories.some(
      (item) => item.name === category
    );

    if (!categoryExists) {
      await deleteUploadedFile(req.file?.filename);

      return res.status(400).json({
        success: false,
        message: "Please select a valid category",
      });
    }

    const course = await Course.create({
      recordType: "course",
      name,
      category,
      fee,
      duration,
      upload: getUploadDetails(req.file),
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    await deleteUploadedFile(req.file?.filename);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// 2. GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. GET SINGLE COURSE
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. UPDATE COURSE
// 4. UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {
    const { name, category, fee, duration } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;

    if (category !== undefined) {
      const registry = await getCategoryRegistry();

      const categoryExists = registry.categories.some(
        (item) => item.name === category
      );

      if (!categoryExists) {
        await deleteUploadedFile(req.file?.filename);

        return res.status(400).json({
          success: false,
          message: "Please select a valid category",
        });
      }

      updateData.category = category;
    }

    if (fee !== undefined) updateData.fee = fee;
    if (duration !== undefined) updateData.duration = duration;

    // If a new PDF is uploaded, replace the old one
    if (req.file) {
      updateData.upload = getUploadDetails(req.file);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide fields to update",
      });
    }

    const existingCourse = await Course.findOne({
      _id: req.params.id,
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    });

    if (!existingCourse) {
      await deleteUploadedFile(req.file?.filename);

      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const oldFileName = existingCourse.upload?.fileName;

    const course = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { recordType: "course" },
          { recordType: { $exists: false } },
        ],
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      await deleteUploadedFile(req.file?.filename);

      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Delete old PDF only after successful database update
    if (req.file && oldFileName) {
      await deleteUploadedFile(oldFileName);
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    await deleteUploadedFile(req.file?.filename);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET COURSE PDF

export const getCourseUpload = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (!course.upload?.fileName) {
      return res.status(404).json({
        success: false,
        message: "No PDF uploaded for this course",
      });
    }

    const filePath = path.join(
      uploadDirectory,
      path.basename(course.upload.fileName)
    );

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${path.basename(
        course.upload.originalName || course.upload.fileName
      )}"`
    );

    return res.sendFile(filePath, (error) => {
      if (error && !res.headersSent) {
        return res.status(404).json({
          success: false,
          message: "PDF file not found",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. DELETE COURSE

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await deleteUploadedFile(course.upload?.fileName);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// PDF UPLOAD HELPERS
const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "courses"
);

const deleteUploadedFile = async (fileName) => {
  if (!fileName) return;

  try {
    await fs.unlink(
      path.join(uploadDirectory, path.basename(fileName))
    );
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("PDF delete error:", error.message);
    }
  }
};

const getUploadDetails = (file) => {
  if (!file) return undefined;

  return {
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    fileSize: file.size,
  };
};