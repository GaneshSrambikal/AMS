const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth/authRoutes.js');
const adminRouter = require('./routes/users/adminRoutes.js');
const attendanceRouter = require('./routes/attendance/attendanceRoutes.js');
const app = express();

// middleware setup
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  return res.json({ message: 'Server started. Use /api endpoints to access.' });
});

app.get('/api', (req, res) => {
  res.json({ message: { author: 'Ganesh Srambikal' } });
});

// auth Routes
app.use('/api/auth', authRouter);

// ADMIN ROUTES
app.use('/api/admin', adminRouter);

// Attendance routes for employees
app.use('/api/attendance', attendanceRouter);

module.exports = app;
