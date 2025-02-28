const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users: users });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
};
