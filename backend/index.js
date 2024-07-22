const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'http://127.0.0.1/',
  user: 'sql_myboxchat_cc', // Tên người dùng MySQL của bạn
  password: '58c08935760bb', // Mật khẩu MySQL của bạn
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

  // Tạo bảng và thêm dữ liệu
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      age INT
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table created or already exists.');

    const insertUserQuery = 'INSERT INTO users SET ?';
    const user = { name: 'Alice', age: 25 };

    connection.query(insertUserQuery, user, (err, result) => {
      if (err) throw err;
      console.log('User added with ID:', result.insertId);

      // Đóng kết nối
      connection.end();
    });
  });
});