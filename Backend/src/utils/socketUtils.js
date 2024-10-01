let io;

const initializeSocket = (httpServer) => {
  io = require('socket.io')(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

const notifyNewBid = (data) => {
  io.emit('newBid', data);
};

const notifyTenderUpdate = (data) => {
  io.emit('tenderUpdated', data);
};

module.exports = { initializeSocket, notifyNewBid, notifyTenderUpdate };
