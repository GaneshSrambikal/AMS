const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');
// const mongoose = require('mongoose');

// FIND USER BY ID
exports.findUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(400).json('Invalid id');
  }
};

// GET ALL ATTENDANCE HISTORY
exports.getAllAttendanceHistory = async (req, res) => {
  try {
    const attendances = await Attendance.find().sort({ date: -1 });
    return res.json(attendances);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

// EDIT AN USER's ATTENDANCE
exports.editAttendanceById = async (req, res) => {
  try {
    const { checkInTime, checkOutTime } = req.body;

    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(400).json({ message: 'No records found.' });
    }
    if (checkInTime) {
      attendance.checkInTime = new Date(checkInTime);
      await attendance.save();
    }
    if (checkOutTime) {
      attendance.checkOutTime = new Date(checkOutTime);
    }
    await attendance.save();
    return res
      .status(200)
      .json({ message: 'Attendance Updated.', attendance: attendance });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

// USER MANAGEMENT

// GET ALL USERS
// @desc   Get all employees
// @route  GET /api/admin/users
// @access Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user.id } }); // Find all user except current
    res.json({ users: allUsers });
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'server error' });
  }
};

// CREATE USER
// @desc   Admin adds an employee
// @route  POST /api/admin/users/add
// @access Private (Admin)
exports.addUser = async (req, res, next) => {
  const { name, email, password, designation } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: `Employee with ${email} id already exists.` });

    const user = new User({
      name,
      email,
      password,
      designation,
      role: 'employee',
    });
    await user.save();
    return res.status(201).json({
      message: 'Employee added successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
      },
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'server error' });
  }
};

// DELETE USER
// @desc   Admin deletes an employee
// @route  DELETE /api/admin/users/:id
// @access Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: 'User not found.' });
    await user.deleteOne();
    return res
      .status(200)
      .json({ message: `Deleted Employee id: ${req.params.id}` });
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// EDIT USER
// @desc   Admin deletes an employee
// @route  PUT /api/admin/users/edit/:id
// @access Private (Admin)
exports.editUser = async (req, res, next) => {
  try {
    const { name, designation, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: 'Employee not found.' });

    if (user) {
      user.name = name || user.name;
      user.designation = designation || user.designation;
      user.role = role || user.role;
    }
    await user.save();
    return res.status(200).json({ message: 'Employee updated successfully.' });
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};
