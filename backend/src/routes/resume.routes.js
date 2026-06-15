const express = require('express');

const router = express.Router();

const resumeController = require('../controllers/resume.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post("/", authMiddleware.authUser, resumeController.createResume);
router.get('/', authMiddleware.authUser, resumeController.getUserResume);
router.delete('/:id', authMiddleware.authUser, resumeController.deleteResume);

module.exports = router;