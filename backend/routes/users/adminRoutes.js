const {
  findUserById,
  getAllAttendanceHistory,
  editAttendanceById,
  addUser,
  deleteUser,
  editUser,
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

// CREATE USER
// route /api/admin/users/add
router.post('/users/add', protect, adminOnly, addUser);

// DELETE USER
// route /api/admin/users/:id
router.delete('/users/:id', protect, adminOnly, deleteUser);

// EDIT USER
//route /api/admin/users/edit/:id
router.put('/users/edit/:id', protect, adminOnly, editUser);

// GET ALL ATTENDANCE HISTORY
// route /api/admin/attendance/history
router.get('/attendance/history', protect, adminOnly, getAllAttendanceHistory);

// EDIT USER ATTENDANCE BY ID
// route /api/admin/attendance/edit/:id
router.post('/attendance/edit/:id', protect, adminOnly, editAttendanceById);

module.exports = router;
