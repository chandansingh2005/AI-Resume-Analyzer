const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const analysisController = require('../controllers/analysis.controller');

router.get('/:id', authMiddleware.authUser, analysisController.analyzeResume);

module.exports = router;