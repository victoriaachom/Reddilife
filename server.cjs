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
let messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.emit('initialMessages', messages);

  socket.on('vote', (choice) => {
    votes[choice] = (votes[choice] || 0) + 1;
    io.emit('voteUpdate', votes);
  });

  socket.on('resetVotes', () => {
    votes = {};
    io.emit('voteUpdate', votes);
  });

  socket.on('sendMessage', (messageData) => {
    const newMessage = {
      ...messageData,
      id: Date.now() + Math.random(),
      timestamp: Date.now()
    };
    
    messages.push(newMessage);
    
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }
    
    io.emit('newMessage', newMessage);
    console.log('Message broadcasted:', newMessage);
  });

  socket.on('userJoined', (username) => {
    const joinMessage = {
      id: Date.now() + Math.random(),
      username: 'System',
      message: `${username} joined the chat!`,
      timestamp: Date.now(),
      isSystem: true
    };
    
    messages.push(joinMessage);
    io.emit('newMessage', joinMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});