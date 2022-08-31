const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: 'root',
    database: 'employees',
    port: 3306
  });

connection.connect(function(err){
    if(err) throw err;
  })


  module.exports = db;