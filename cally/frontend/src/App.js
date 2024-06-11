import React, {useState} from "react";
import ScoreInput from "./components/ScoreInput";

const App = () => {

  const [scores, setScores] = useState(Array(18).fill(0));

  const handleScoreChange = (hole, score) => {
    const newScores = [...scores];
    newScores[hole -1] = parseInt(score, 10);
    setScores(newScores);
  };

  const handleSubmit = async () => {
    try{

      const respone = await fetch('http://127.0.0.1:5000/api/calculate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({scores})
      });
  
      if (!respone.ok ) {
        throw new Error ('network response was not okay');
      }
  
      const result = await respone.json();
      alert(`Final Score: ${result.finalScore}`);

    } catch (error){
      console.error('failed to fetch ', error);
    }
    
  };

  return (
    <div>
      <h1>Score Input</h1>
      {scores.map((_, index) => (
        <ScoreInput key={index} hole={index +1} onScoreChange={handleScoreChange} />
      ))}
      <button onClick={handleSubmit}>Submit Scores</button>
    </div>
  );
};

export default App;