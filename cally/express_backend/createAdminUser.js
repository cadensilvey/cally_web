const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // MAMP MySQL password
  database: 'callaway_leaderboard',
  port: '8889'
});

const password = 'root'; // Replace with your admin password
const saltRounds = 10;
const username = 'root'; // Replace with your desired admin username

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
  db.execute(query, [username, hash], (err, results) => {
    if (err) {
      console.error('Error inserting admin user:', err);
      return;
    }
    console.log('Admin user inserted successfully');
    db.end(); // Close the connection
  });
});
