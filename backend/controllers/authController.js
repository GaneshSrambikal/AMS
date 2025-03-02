const User = require('../models/userModel');
const { generateToken } = require('../utils/tokenService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// @desc Register a new user (Admin only)
// @route POST /api/auth/register
// @access Private (Admin)
exports.registerUser = async (req, res) => {
  const { name, email, password, designation, role } = req.body;
  try {
    // find if email exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists!.' });
    }
    // create new user
    const user = new User({
      name,
      email,
      password,
      designation,
      role,
    });
    // save user
    await user.save();
    // return created user details
    res.status(201).json({
      message: 'User created successfully',
      id: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(`Error:${error}`);
    return res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    } else {
      // if exist match password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
    }
    // Generate Token

    const userSign = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation,
    };
    const token = await generateToken(userSign);
    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error.' });
  }
};
