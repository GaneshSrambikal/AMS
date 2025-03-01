const { Server } = require('socket.io');
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Allow requests from Vite frontend
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`WebSocket connected: ${socket.id}`);

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
