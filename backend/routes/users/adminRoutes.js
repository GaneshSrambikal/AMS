const { findUserById } = require('../../controllers/adminController');
const { getAllUsers } = require('../../controllers/adminController');
const { protect, adminOnly } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// GET ALL USERS
router.get('/users', protect, adminOnly, getAllUsers);

// FIND USER BY ID
router.get('/users/:id', protect, adminOnly, findUserById);

module.exports = router;
