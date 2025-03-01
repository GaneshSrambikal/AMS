const http = require('http');
const { initSocket } = require('./sockets/socket');
const app = require('./app');
const connectDB = require('./config/db');
const { notifyToCheckOut } = require('./utils/notificationService');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

connectDB();

initSocket(server);

server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

notifyToCheckOut();
