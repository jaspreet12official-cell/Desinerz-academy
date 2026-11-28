
import Student from "../models/studentSchema.js";
import Course from "../models/courseSchema.js";

// ==========================================
// STUDENT MANAGEMENT
// ==========================================

// 1. CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const {
      registrationNo,
      name,
      email,
      phone,
      parentName,
      parentContact,
      aadhaarNo,
      courseId,
      enrollmentDate,
      status,
    } = req.body;

    // Check course exists
    const course = await Course.findOne({
      _id: courseId,
      $or: [
        { recordType: "course" },
        { recordType: { $exists: false } },
      ],
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid course",
      });
    }

    // Check duplicate registration number
    const existingStudent = await Student.findOne({
      registrationNo: registrationNo?.trim(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Registration number already exists",
      });
    }

    const student = await Student.create({
      registrationNo,
      name,
      email,
      phone,
      parentName,
      parentContact,
      aadhaarNo,
      courseId,
      enrollmentDate,
      status: status || "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    // Status filter: Active, Pending, Inactive
    if (status) {
      filter.status = status;
    }

    // Search by student name or contact number
    if (search && search.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const searchRegex = new RegExp(escapedSearch, "i");

      filter.$or = [
        { name: searchRegex },
        { phone: searchRegex },
      ];
    }

    const students = await Student.find(filter)
      .populate("courseId", "name category fee duration")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select("+aadhaarNo")
      .populate("courseId", "name category fee duration");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const allowedFields = [
      "registrationNo",
      "name",
      "email",
      "phone",
      "parentName",
      "parentContact",
      "aadhaarNo",
      "courseId",
      "enrollmentDate",
      "status",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide fields to update",
      });
    }

    // Validate course if changed
    if (updateData.courseId) {
      const course = await Course.findOne({
        _id: updateData.courseId,
        $or: [
          { recordType: "course" },
          { recordType: { $exists: false } },
        ],
      });

      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Please select a valid course",
        });
      }
    }

    // Check duplicate registration number
    if (updateData.registrationNo) {
      const existingStudent = await Student.findOne({
        registrationNo: updateData.registrationNo.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: "Registration number already exists",
        });
      }
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("+aadhaarNo")
      .populate("courseId", "name category fee duration");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
