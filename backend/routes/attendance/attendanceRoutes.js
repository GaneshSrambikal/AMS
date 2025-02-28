const { checkIn, checkOut } = require('../../controllers/attendanceController');
const { protect } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// Check in/out routes (Employee Only)
router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);

module.exports = router;
