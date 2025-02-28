const { checkIn, checkOut } = require('../../controllers/attendanceController');
const {
  protect,
  employeeOnly,
} = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// Check in/out routes (Employee Only)
router.post('/check-in', protect, employeeOnly, checkIn);
router.post('/check-out', protect, employeeOnly, checkOut);

module.exports = router;
