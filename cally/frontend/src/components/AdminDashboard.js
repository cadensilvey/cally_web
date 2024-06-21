// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3000/leaderboard');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid data format received');
      }
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching or updating leaderboard:', error);
      setError('Failed to fetch leaderboard. Please try again.');
    }
  };

  const handleDelete = async (teamName) => {
    try {
      await axios.delete(`http://localhost:3000/leaderboard/${encodeURIComponent(teamName)}`, {
        headers: { Authorization: token }
      });
      fetchLeaderboard(); // Update leaderboard after successful deletion
    } catch (error) {
      console.error('Error deleting entry', error);
      setError('Error deleting entry');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:3000/delete-all', {
        headers: { Authorization: token }
      });
      fetchLeaderboard(); // Optionally refresh the leaderboard after deletion
    } catch (error) {
      console.error('Error deleting all entries from leaderboard', error);
      setError('Error deleting all entries from leaderboard');
    }
  };

  const handleEdit = (teamName) => {
    navigate(`/admin/edit/${teamName}`);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <ul className="divide-y divide-gray-200 rounded-lg shadow-lg overflow-hidden">
        {leaderboard.map((entry, index) => (
          <li key={index} className="py-4 px-6 sm:px-10 flex items-center justify-between bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out">
            <div className="flex items-center">
              <span className="font-semibold mr-4">{index + 1}</span>
              <span className="mr-8">{entry.team_name}</span>
              <span className="text-gray-600">{`Total Score: ${entry.total_score}, Callaway Score: ${entry.callaway_score}`}</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(entry.team_name)} className="text-blue-500 hover:text-blue-700">Edit</button>
              <button onClick={() => handleDelete(entry.team_name)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteAll} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete All Entries
      </button>
    </div>
  );
};

export default AdminDashboard;
