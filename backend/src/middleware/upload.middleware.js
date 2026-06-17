const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Strips out the original .pdf extension to avoid double extensions like file.pdf.pdf
    const uniqueFilename = Date.now() + "-" + file.originalname.replace(".pdf", "");
    
    return {
      folder: "ai-resume-analyzer",
      resource_type: "raw", // Keep this as raw so pdf-parse can read it later
      public_id: uniqueFilename,
      format: "pdf"
    };
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

module.exports = upload;