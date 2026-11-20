
import Student from "../models/studentSchema.js";
import Course from "../models/courseSchema.js";

// CREATE STUDENT
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
    } = req.body;

    // Check course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Selected course not found",
      });
    }

    // Check duplicate registration number
    const existingStudent = await Student.findOne({
      registrationNo: registrationNo?.trim(),
    });

    if (existingStudent) {
      return res.status(409).json({
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
    });

    res.status(201).json({
      message: "Student created successfully",
      student: {
        ...student.toObject(),
        aadhaarNo: undefined,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Registration number already exists",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};


// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("courseId", "name category fee duration")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Students fetched successfully",
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};


// GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("courseId", "name category fee duration");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student fetched successfully",
      student,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    });
  }
};


// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

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
    ];

    // Update only allowed fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    // Validate selected course
    if (req.body.courseId) {
      const course = await Course.findById(req.body.courseId);

      if (!course) {
        return res.status(404).json({
          message: "Selected course not found",
        });
      }
    }

    await student.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("courseId", "name category fee duration");

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Registration number already exists",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
};


// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};
