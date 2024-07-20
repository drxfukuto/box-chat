// Phía server (server.js)
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = new Map(); // Lưu trữ danh sách người dùng

// Định nghĩa route cho trang chủ
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('user joined', username); // Thông báo tới tất cả người dùng 
    console.log(username,'join');
  });

  socket.on('chat message', (message) => {
    const username = users.get(socket.id);
    io.emit('chat message', { username, message }); // Gửi tin nhắn tới tất cả người dùng
    console.log(username,message);
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('user left', username); // Thông báo tới tất cả người dùng
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});