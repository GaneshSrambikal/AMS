const { format } = require('date-fns');
const Attendance = require('../models/attendanceModel');

// @desc   Employee Check-in
// @route  POST /api/attendance/check-in
// @access Private (Employee Only)
exports.checkIn = async (req, res) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  try {
    const attendanceExist = await Attendance.findOne({
      user: req.user.id,
      date: today,  // checks for today's check in
    });
    if (attendanceExist) {
      return res.status(400).json({ message: 'Already checked in.' });
    }
    const newAttendance = new Attendance({
      user: req.user.id,
      date: today,
      checkInTime: new Date(),
    });
    await newAttendance.save();

    res
      .status(200)
      .json({ message: 'checked-in successfully.', attendance: newAttendance });
  } catch (error) {
    res.status(500).json('server error');
    return;
  }
};

// @desc   Employee Check-out
// @route  PUT /api/attendance/check-out
// @access Private (Employee Only)
exports.checkOut = async (req, res) => {
  // get todays date
  const today = format(new Date(), 'yyyy-MM-dd');
  try {
    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    });
    // check if checked in
    if (!attendance)
      return res.status(400).json({ message: 'Please Check-in first!' });
    // check if checked out
    if (attendance.checkOutTime)
      return res.status(400).json({ message: 'Checkout already.' });
    // update check out
    attendance.checkOutTime = new Date();
    // save attendance
    await attendance.save();
    return res
      .status(200)
      .json({ message: 'Check-out successful.', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error.' });
    return;
  }
};
