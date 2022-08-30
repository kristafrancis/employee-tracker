const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: '',
    database: 'employees',
    port: 3306
  });

  db.connect(function(err){
    if(err) throw err;
  });

  module.exports = db;