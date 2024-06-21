const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Scorecard = require('./callaway');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'root'; 

// this is my database connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'callaway_leaderboard',
  port: '8889'
});

// calcuate the callaway score and return the result
app.post('/calculate', (req, res) => {
  const { scores, name } = req.body;
  if (!scores || !Array.isArray(scores) || scores.length !== 18) {
    return res.status(400).send({ error: 'Scores must be an array of 18 integers' });
  }
  
  const scorecard = new Scorecard(scores, name);
  const result = {
    name: scorecard.getName(),
    scorecard: scorecard.getScorecard(),
    totalScore: scorecard.totalScore(),
    holes: scorecard.getHoles(),
    adjustment: scorecard.getAdjustment(),
    deduction: scorecard.getDeduction(),
    callawayScore: scorecard.calc()
  };

  // add the score to the leaderboard
  const query = 'INSERT INTO leaderboard (team_name, total_score, callaway_score) VALUES (?, ?, ?)';
  db.execute(query, [result.name, result.totalScore, result.callawayScore], (err, results) => {
    if(err) {
      console.log("error with adding the results to the database dummy");
      return res.status(500).json({error: err.message});
    }
    res.send(results);
  });
  
  // res.send(result);
});

// get the leaderboard
app.get('/leaderboard', (req, res) => {
  const query = 'SELECT team_name, total_score, callaway_score FROM leaderboard ORDER BY callaway_score ASC';
  db.execute(query, (err, results) => {
    if(err) {
      console.log("there was an error trying to show the leaderboard");
      return res.status(500).json({error: err.message});
    }
    res.status(200).json(results);
  });
});

// Admin login route
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  const query = 'SELECT * FROM admins WHERE username = ?';
  db.execute(query, [username], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      console.error('No user found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const admin = results[0];
    console.log('User found:', admin);

    const validPassword = await bcrypt.compare(password, admin.password);
    console.log('Password comparison result:', validPassword);

    if (!validPassword) {
      console.error('Invalid password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('A token is required for authentication');

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.admin = decoded;
      next(); // Proceed to the next middleware or route handler
  } catch (err) {
      return res.status(401).send('Invalid Token');
  }
};

// DELETE route to delete a leaderboard entry by team_name
app.delete('/leaderboard/:team_name', verifyToken, (req, res) => {
  const teamName = req.params.team_name;
  console.log('Deleting team:', teamName); // Log the team name being deleted
  const query = 'DELETE FROM leaderboard WHERE team_name = ?';

  db.execute(query, [teamName], (err, results) => {
      if (err) {
          console.error('Error deleting from leaderboard:', err);
          return res.status(500).json({ error: err.message }); // Send error response here
      }
      console.log('Delete operation successful');
      res.status(204).send(); // Successful deletion response
  });
});

// Get a specific leaderboard entry by team_name
app.get('/leaderboard/:team_name', (req, res) => {
  const teamName = req.params.team_name;
  console.log('Trying to GET Team:', teamName);
  const query = 'SELECT * FROM leaderboard WHERE team_name = ?';

  db.execute(query, [teamName], (err, results) => {
    if (err) {
      console.error('error selecting from the leaderboard:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results[0]);
  });
});

// Delete all entries from leaderboard (admin only)
app.delete('/delete-all', verifyToken, (req, res) => {
  const query = 'DELETE FROM leaderboard';
  db.execute(query, (err, results) => {
      if (err) {
          console.error('Error deleting all entries from leaderboard:', err);
          return res.status(500).json({ error: err.message });
      }
      console.log('Deleted all entries from leaderboard');
      res.status(204).send(); // Successful deletion response
  });
});

// server.js




// Update entries in the leaderboard (admin only) using the team name 
app.put('/leaderboard/:team_name', verifyToken, (req, res) => {
  const team_name_param = req.params.team_name;
  const { team_name, total_score, callaway_score } = req.body;
  const query = 'UPDATE leaderboard SET team_name = ?, total_score = ?, callaway_score = ? WHERE team_name = ?';
  db.execute(query, [team_name, total_score, callaway_score, team_name_param], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
