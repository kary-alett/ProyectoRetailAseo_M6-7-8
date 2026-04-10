// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', register);       // POST /api/auth/register — pública
router.post('/login', login);             // POST /api/auth/login — pública
router.get('/me', verifyToken, getMe);    // GET /api/auth/me — protegida 🔒

module.exports = router;