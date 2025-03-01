require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASS,
  },
});

exports.sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAILID,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log('Server Error', error);
  }
};
