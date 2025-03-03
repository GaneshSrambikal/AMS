const Notification = require('../models/notificationModel.js');
const User = require('../models/userModel.js');
const { getIo } = require('../sockets/socket.js');

//Admin sends a notification
exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = await Notification.create({ user: userId, message });

    //  Send real-time notification
    getIo().to(userId).emit('newNotification', notification);

    res.status(201).json({ message: 'Notification sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification' });
  }
};

//Get notifications for an employee
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { seen: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};

// send reminder
exports.sendReminderToAll = async (req, res) => {
  try {
    const users = await User.find({}, '_id'); // Get all user IDs
    const notifications = [];

    for (const user of users) {
      const notification = await Notification.create({
        user: user._id,
        message: '🔔 Reminder: Please mark your attendance!',
      });
      notifications.push(notification);

      //  Send real-time notification via WebSocket
      getIo().to(user._id.toString()).emit('newNotification', notification);
    }

    res.status(201).json({ message: 'Reminder sent to all users!' });
  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).json({ message: 'Error sending reminder' });
  }
};
