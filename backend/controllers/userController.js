const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users: users });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};
exports.getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.getUserAttendanceHistory = async (req, res) => {
  try {
    const attendances = await Attendance.find({ user: req.user.id })
      .sort({
        date: -1,
      })
      .populate('user', 'name email');
    let totalWorkHours = 0;
    for (let attendance of attendances) {
      totalWorkHours += attendance.workHours;
    }
    return res
      .status(200)
      .json({ attendances: attendances, total_w_hours: totalWorkHours });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
