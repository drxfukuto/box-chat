// Lưu trữ tên người dùng
let username = 'John Doe';

// Lưu trữ tin nhắn
let message = 'Hello, World!'; 


// Tìm phần tử HTML để chứa danh sách tin nhắn
const chatMessages = document.getElementById('chat-messages');
if (!chatMessages) {
  // Nếu không tìm thấy phần tử, hãy tạo một danh sách mới
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-container';
  const messageList = document.createElement('ul');
  messageList.id = 'chat-messages';
  chatContainer.appendChild(messageList);
  document.body.appendChild(chatContainer);
}

// Kết nối đến server sử dụng Socket.IO
const socket = io(); // Giả sử bạn đã setup Socket.IO server

// Xử lý sự kiện kết nối
socket.on('connect', () => {
  console.log('Connected to server');

  // Gửi tin nhắn
  socket.emit('chat message', { username, message }); 
  console.log({username,message})
});

// Xử lý sự kiện nhận tin nhắn từ server
socket.on('chat message', (data) => {
  const { username, message } = data;
  const messageElement = document.createElement('li');
  messageElement.textContent = `${username}: ${message}`;
  chatMessages.insertBefore(messageElement, chatMessages.firstChild);
});

// Xử lý sự kiện ngắt kết nối
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});