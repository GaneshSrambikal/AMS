const express = require('express');
const { registerUser, loginUser } = require('../../controllers/authController');
const { protect, adminOnly } = require('../../middlewares/auth/authMiddleware');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', protect, adminOnly, registerUser);

module.exports = router;
