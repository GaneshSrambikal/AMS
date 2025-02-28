const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // store formatted date string
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    workHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// calculate the work hours before save on checkout
AttendanceSchema.pre('save', function (next) {
  if (this.isModified('checkOutTime') || this.isModified('checkInTime')) {
    const diffHrs = parseFloat(
      ((this.checkOutTime - this.checkInTime) / (1000 * 60 * 60)).toFixed(2)
    );

    this.workHours = diffHrs;
  }
  next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
