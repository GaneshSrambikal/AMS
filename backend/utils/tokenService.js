const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = async (id, role) => {
  return await jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
