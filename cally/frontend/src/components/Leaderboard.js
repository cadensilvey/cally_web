import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3000/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('There was an error fetching the leaderboard', error);
      setError('There was an error fetching the leaderboard. Please try again.');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <ul className="divide-y divide-gray-200 rounded-lg shadow-lg overflow-hidden">
        {leaderboard.map((entry, index) => (
          <li key={index} className={`py-4 px-6 sm:px-10 flex items-center justify-between 
            ${index === 0 ? 'bg-yellow-300' : (index === 1 || index === 2 ? 'bg-gray-300' : 'bg-white')}
            hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out`}>
            <div className="flex items-center">
              <span className="font-semibold mr-4">{index + 1}</span>
              <span className="mr-8">{entry.team_name}</span>
              <span className="text-gray-600">{`Total Score: ${entry.total_score}, Callaway Score: ${entry.callaway_score}`}</span>
            </div>
            <span className="text-gray-600">{`${entry.total_score}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
