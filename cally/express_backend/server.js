const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Scorecard = require('./callaway');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
  })
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
