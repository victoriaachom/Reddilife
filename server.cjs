const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

let votes = {};

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('vote', (choice) => {
    votes[choice] = (votes[choice] || 0) + 1;
    io.emit('voteUpdate', votes);
  });

  socket.on('resetVotes', () => {
    votes = {};
    io.emit('voteUpdate', votes);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
