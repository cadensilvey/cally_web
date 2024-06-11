import React, {useState} from "react";
import ScoreInput from "./components/ScoreInput";


const App = () => {

  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(1);

  const handleScoreChange = (hole, score) => {
    const newScores = [...scores];
    newScores[hole -1] = parseInt(score, 10);
    setScores(newScores);
  };

  const handleSubmit = async () => {
      if(currentHole < 18 ){
        setCurrentHole(currentHole + 1);
      }
      else {

        
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
      }    
  };

  return (
    <div class="pt-10 items-center justify-center h-screen">
      <h1 class="text-5xl font-semibold mb-2 text-center">Cally Score Input</h1>
      <ScoreInput
        hole={currentHole}
        onScoreChange={handleScoreChange}
        onNext={handleSubmit}
      />
      
    </div>
  );
};

export default App;