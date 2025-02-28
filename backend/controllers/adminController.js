const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');
// const mongoose = require('mongoose');

// GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user.id } }); // Find all user except current
    res.json({ users: allUsers });
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'server error' });
  }
};

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
