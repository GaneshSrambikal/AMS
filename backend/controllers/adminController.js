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
