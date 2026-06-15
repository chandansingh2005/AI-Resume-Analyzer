const express = require('express');

const router = express.Router();

const upload = require('../middleware/upload.middleware')

const resumeController = require('../controllers/resume.controller');
const authMiddleware = require('../middleware/auth.middleware')


router.post('/', authMiddleware.authUser, upload.single("resume"), resumeController.createResume)
router.get('/', authMiddleware.authUser, resumeController.getUserResume);
router.delete('/:id', authMiddleware.authUser, resumeController.deleteResume);


module.exports = router;