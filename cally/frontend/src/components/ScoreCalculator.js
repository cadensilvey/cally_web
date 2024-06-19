// src/components/ScoreCalculator.js
import React, { useState, useEffect } from "react";
import ScoreInput from "./ScoreInput";
// import { calculateCallawayScore } from "../apiService";
import axios from "axios";

const ScoreCalculator = () => {
  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(1);
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

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

  // const handleSubmitScores = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/calculate', {fetchLeaderboard(response)});
  //       fetchLeaderboard();
  //     const data = await calculateCallawayScore(scores, name);
  //     setResult(data);
  //     setIsSubmitted(true);
  //     setError(null); // Reset error if successful
  //   } catch (error) {
  //     console.error("Error calculating score", error);
  //     setError("Failed to calculate score. Please try again.");
  //   }
  // };

  const handleSubmitScores = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculate', { scores, name });
      const data = response.data;
      setResult(data);
      setIsSubmitted(true);
      setError(null); // Reset error if successful
      fetchLeaderboard(); // Fetch updated leaderboard
    } catch (error) {
      console.error("Error calculating score", error);
      setError("Failed to calculate score. Please try again.");
    }
  };


  const fetchLeaderboard = async() => {
    try{
      const response = await axios.get('http://localhost:3000/leaderboard');
      setLeaderboard(response.data);
    } catch(error) {
      console.error('there was an error fetching the leaderboard', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto">
      {!isSubmitted ? (
        <>
          <div className="text-center my-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border-2 border-gray-300 p-2 rounded mb-4"
            />
          </div>
          <ScoreInput
            hole={currentHole}
            onScoreChange={handleScoreChange}
            onNext={handleNextHole}
          />
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </>
      ) : (
        <div className="text-center my-4">
          {result ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Callaway Score Result</h2>
              <p>Name: {result.name}</p>
              <p>Total Score: {result.totalScore}</p>
              <p>Holes Deducted: {result.holes}</p>
              <p>Adjustment: {result.adjustment}</p>
              <p>Deduction: {result.deduction}</p>
              <p>Callaway Score: {result.callawayScore}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <button
            onClick={() => {
              setScores(Array(18).fill(0));
              setCurrentHole(1);
              setResult(null);
              setIsSubmitted(false);
              setName("");
              setError(null);
            }}
            className="mt-4 bg-green-700 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded"
          >
            Start New Round
          </button>
        </div>
      )}

      <div className="text-center my-4">
        <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              Team Name: {entry.team_name}: Total Score: {entry.total_score} Callaway Score: {entry.callaway_score} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default ScoreCalculator;
