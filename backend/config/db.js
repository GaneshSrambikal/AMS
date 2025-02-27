const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Mongodb connected 
        Port: ${conn.connection.port}
        Host: ${conn.connection.host}
        `);
    conn.connection.on('error', (err) => {
      console.log(`Error connection to db: ${err.message}`);
    });
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
