const { Server } = require('socket.io');
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' },
  });
  console.log('web socket started.');
  io.on('connection', (socket) => {
    console.log(`WebSocket connected: ${socket.id}`);

    socket.on('User Joined', (userId) => {
      console.log(`User Joined: ${userId}`);
      socket.join(userId);
    });
    socket.on('disconnect', () => {
      console.log(`WebSocket disconnected: ${socket.id}`);
    });
  });
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIo };
