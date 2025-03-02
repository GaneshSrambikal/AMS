const router = require('express').Router();

const {
  sendNotification,
  getNotifications,
  markAsRead,
  sendReminderToAll,
} = require('../../controllers/notificationController.js');
const {
  adminOnly,
  protect,
} = require('../../middlewares/auth/authMiddleware.js');

router.post('/send', protect, adminOnly, sendNotification);
router.get('/:userId', protect, getNotifications);
router.put('/mark/:id', protect, markAsRead);
router.post('/send-reminder', protect, adminOnly, sendReminderToAll);

module.exports = router;
