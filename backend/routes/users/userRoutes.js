const {
  getUserAttendanceHistory,
  getUserDetail,
} = require('../../controllers/userController');
const {
  protect,
  employeeOnly,
} = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// get attendance history
// route GET /api/users/attendance/history
router.get(
  '/attendance/history',
  protect,
  employeeOnly,
  getUserAttendanceHistory
);

// get user detail
// route GET /api/users/detail
router.get('/detail', protect, employeeOnly, getUserDetail);

module.exports = router;
