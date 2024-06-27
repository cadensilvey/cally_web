import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
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



  const openModal = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/round/${id}`);
      setSelectedRound(response.data);
    } catch (error) {
      console.error('Error fetching round stats:', error);
      setError('Error fetching round stats. Please try again.');
    }
  };

  const closeModal = () => {
    setSelectedRound(null);
  };

  return (
    <div className="text-center my-4">
    <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
    {error && <div className="text-red-500 mt-2">{error}</div>}
    
    <ul className="divide-y divide-gray-200 rounded-lg shadow-lg overflow-hidden">
      {leaderboard.map((entry, index) => (
        <li key={entry.id} className={`py-4 px-6 sm:px-10 flex items-center justify-between 
          ${index === 0 ? 'bg-yellow-300' : (index === 1 || index === 2 ? 'bg-gray-300' : 'bg-white')}
          hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out`}
          onClick={() => openModal(entry.id)}>
          <div className="flex items-center"> 
            <span className="font-semibold mr-4">{index + 1}</span>
            <span className="mr-8">{entry.team_name}</span>
            <span className="text-gray-600">{`Total Score: ${entry.total_score}, Callaway Score: ${entry.callaway_score}`}</span>
          </div>
          <span className="text-gray-600">{`${entry.callaway_score}`}</span>
        </li>
      ))}
    </ul>

    {/* Modal for displaying round stats */}
    {selectedRound && (
      <>
        <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
          {/* Background overlay for the blur effect */}
        </div>
        <div className="fixed z-50 inset-0 flex items-center justify-center min-h-screen p-4">
          {/* Modal content */}
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Round Stats</h3>
              <button onClick={closeModal} className="text-gray-600">&times;</button>
            </div>
            <p>Team Name: {selectedRound.team_name}</p>
            <p>Scorecard: {selectedRound.scorecard}</p>
            <p>Total Score: {selectedRound.total_score}</p>
            <p>Callaway Score: {selectedRound.callaway_score}</p>
            <p>Holes: {selectedRound.holes}</p>
            <p>Adjustment: {selectedRound.adjustment}</p>
            <p>Deduction: {selectedRound.deduction}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default Leaderboard;
