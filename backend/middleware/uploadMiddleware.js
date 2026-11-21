
import multer from "multer";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "courses"
);

// Create upload folder if it doesn't exist
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueFileName = `${randomUUID()}.pdf`;
    cb(null, uniqueFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" &&
    path.extname(file.originalname).toLowerCase() === ".pdf";

  if (!isPdf) {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,
  },
});

export default upload;
