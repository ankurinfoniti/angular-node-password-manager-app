const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'password_manager',
});

connection.connect(function (error) {
  if (error) throw error;
  console.log('Database connected!');
});

module.exports = connection;
