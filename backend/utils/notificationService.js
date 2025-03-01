const { format } = require('date-fns');
const Attendance = require('../models/attendanceModel');
const Notification = require('../models/notificationModel');
const { getIo } = require('../sockets/socket');

exports.notifyToCheckOut = async () => {
  console.log(`Checkout reminder notification initiated.`);
  const today = format(new Date(), 'yyy-MM-dd');

  try {
    const unCheckedEmployee = await Attendance.find({
      date: today,
      checkOutTime: null,
    }).populate('user', 'name email role');
    console.log(unCheckedEmployee);
    unCheckedEmployee.forEach(async (record) => {
      const message = `Reminder: Hey, ${record.user.name}, you forgot to check out today!.`;

      await Notification.create({ user: record.user._id, message });
      console.log(`notify-${record.user._id}`);
      getIo().emit(`notify-checkout-${record.user._id}`, { message });
    });
  } catch (error) {
    console.log({ message: 'Server Error', error: error.message });
  }
};
