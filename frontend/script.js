// Lưu trữ tên người dùng
let username = 'John Doe';

// Lưu trữ tin nhắn
let message = 'Hello, World!';

// Kết nối đến server
socket.on('connect', () => {
  console.log('Connected to server');

  // Xử lý sự kiện nhận tin nhắn từ server
  socket.on('chat message', (data) => {
    const { username, message } = data;
    const messageElement = document.createElement('li');
    messageElement.textContent = `${username}: ${message}`;
    chatMessages.insertBefore(messageElement, chatMessages.firstChild);
  });

  // Gửi tin nhắn
  socket.emit('chat message', { username, message });
});

// Xử lý sự kiện ngắt kết nối
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});