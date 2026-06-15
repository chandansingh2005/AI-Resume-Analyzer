const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);

    }
})

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"))
        }
        cb(null, true);
    }
});

module.exports = upload;
