const express = require('express');
const cors = require('cors');
const Scorecard = require('./callaway');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
