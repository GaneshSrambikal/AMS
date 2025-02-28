const {
  findUserById,
  getAllAttendanceHistory,
  editAttendanceById,
} = require('../../controllers/adminController');
const { getAllUsers } = require('../../controllers/adminController');
const { protect, adminOnly } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// GET ALL USERS
// route /api/admin/users
router.get('/users', protect, adminOnly, getAllUsers);

// FIND USER BY ID
// route /api/admin/users:/:id
router.get('/users/:id', protect, adminOnly, findUserById);

// GET ALL ATTENDANCE HISTORY
// route /api/admin/attendance/history
router.get('/attendance/history', protect, adminOnly, getAllAttendanceHistory);

// EDIT USER ATTENDANCE BY ID
// route /api/admin/attendance/edit/:id
router.post('/attendance/edit/:id', protect, adminOnly, editAttendanceById);

module.exports = router;
