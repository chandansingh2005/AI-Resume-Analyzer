const express = require('express');

const router = express.Router();

const upload = require('../middleware/upload.middleware')

const resumeController = require('../controllers/resume.controller');
const authMiddleware = require('../middleware/auth.middleware')


router.post('/', authMiddleware.authUser, upload.single("resume"), resumeController.createResume)
router.get('/', authMiddleware.authUser, resumeController.getUserResume);
router.delete('/:id', authMiddleware.authUser, resumeController.deleteResume);
router.get("/test-pdf", async (req, res) => {
  try {
    const axios = require("axios");

    const response = await axios.get(
      "https://res.cloudinary.com/dez5uq62w/image/upload/v1781661708/ai-resume-analyzer/1781661705936-Chandan%20Singh%20Resume.pdf",
      {
        responseType: "arraybuffer"
      }
    );

    console.log("PDF Download Success");
    res.send("PDF Download Success");
  } catch (err) {
    console.log("STATUS:", err.response?.status);
    console.log("HEADERS:", err.response?.headers);

    res.send("Failed");
  }
});


module.exports = router;