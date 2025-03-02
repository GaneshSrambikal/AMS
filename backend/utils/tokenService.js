const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = async (userSign) => {
  return await jwt.sign(userSign, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
