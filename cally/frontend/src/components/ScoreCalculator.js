import React, { useState } from "react";
import ScoreInput from "./ScoreInput";
import axios from "axios";
// import Leaderboard from "./Leaderboard";

const ScoreCalculator = () => {
  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(1);
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [nameEntered, setNameEntered] = useState(false); // Track if name is entered

  const handleScoreChange = (hole, score) => {
    const newScores = [...scores];
    newScores[hole - 1] = score;
    setScores(newScores);
  };

  const handleNextHole = () => {
    if (currentHole < 18) {
      setCurrentHole(currentHole + 1);
    } else {
      handleSubmitScores();
    }
  };

  const handleSubmitScores = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculate', { scores, name });
      // Only set isSubmitted to true, no need to set result
      const data = response.data;
      console.log(data);
      setIsSubmitted(true);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error("Error calculating score", error);
      setError("Failed to calculate score. Please try again.");
    }
  };

  const handleNameSubmit = () => {
    // Basic validation for name
    if (name.trim() !== "") {
      setNameEntered(true);
    } else {
      setError("Please enter your name.");
    }
  };

  const handleStartNewRound = () => {
    setScores(Array(18).fill(0));
    setCurrentHole(1);
    setIsSubmitted(false);
    setName("");
    setError(null);
    setNameEntered(false); // Reset nameEntered state
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      {!nameEntered ? (
        <div className="bg-white shadow-lg p-8 rounded-lg text-center">
          <h1 className="font-medium mb-4">Please Enter Your Team Name:</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team Name: "
            className="border-2 border-gray-300 p-2 rounded mb-4 w-full"
          />
          <button
            onClick={handleNameSubmit}
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Submit Name
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      ) : (
        <>
          {!isSubmitted ? (
            <ScoreInput
              hole={currentHole}
              onScoreChange={handleScoreChange}
              onNext={handleNextHole}
            />
          ) : (
            <div className="text-center my-4">
              <button
                onClick={handleStartNewRound}
                className="bg-green-700 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded mt-4"
              >
                Enter New Round
              </button>
              <h1 className="p-10">
                Thanks for entering your round. Check out the leaderboard to see where you stand.
              </h1>
            </div>
          )}
        </>
      )}
    </div>

  );
};

export default ScoreCalculator;
