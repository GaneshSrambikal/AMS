const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes.js');
const adminRouter = require('./routes/users/adminRoutes.js');
const userRouter = require('./routes/users/userRoutes.js');
const attendanceRouter = require('./routes/attendance/attendanceRoutes.js');
const notificationRouter = require('./routes/notification/notificationRoute.js');
const { corsOrigins } = require('./utils/corsOrigin.js');
const app = express();

// middleware setup
app.use(express.json());
app.use(morgan('dev'));
app.use(corsOrigins);
app.use(express.urlencoded({ extended: false }));


app.get('/api', (req, res) => {
  res.json({ message: { author: 'Ganesh Srambikal' } });
});

// auth Routes
app.use('/api/auth', authRouter);

// ADMIN ROUTES (all user specific routes related to admin)
app.use('/api/admin', adminRouter);

// Attendance routes for employees to check in/out only
app.use('/api/attendance', attendanceRouter);

// User ROUTES (all user specific routes related to users)
app.use('/api/users', userRouter);

// Notification Routes
app.use('/api/notifications', notificationRouter);
module.exports = app;