require('dotenv').config()
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('error para conectar: ' + err.stack);
    return;
  }
 
  console.log('Conectada con exito ' + connection.threadId);
});

module.exports = connection;