const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

// Protect route with jwt token
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   add user to payload
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'user not found, not authorized.' });
      }
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: 'not authorized', errors: error.message });
    }
  } else {
    res.status(404).json({ message: 'Not authorized, token missing!.' });
    return;
  }
};

// Employee Middleware
exports.employeeOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'employee') {
    next();
  } else {
    res.status(403).json({ message: 'Access Denied. Only for Employees.' });
    return;
  }
};

// Admin Middleware
exports.adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access Denied.' });
    return;
  }
};
