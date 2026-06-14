const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logout);

router.get('/profile', authMiddleware.authUser, authController.getProfile);

module.exports = router;

