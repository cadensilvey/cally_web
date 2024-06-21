// EditEntry.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEdit = ({ token }) => {
  const { team_name } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    team_name: '',
    total_score: '',
    callaway_score: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/leaderboard/${team_name}`)
      .then(response => setEntry(response.data))
      .catch(error => console.error('Error fetching entry:', error));
  }, [team_name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/leaderboard/${team_name}`, entry, {
      headers: { Authorization: token }
    })
    .then(() => navigate('/admin'))
    .catch(error => console.error('Error updating entry:', error));
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Edit Entry for {team_name}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label
                className="block text-gray-600 font-medium mb-2"
                htmlFor="team_name"
            >
                Team Name:
            </label>
            <input
                id="team_name"
                type="text"
                name="team_name"
                value={entry.team_name}
                onChange={handleChange}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
            <div>
            <label
                className="block text-gray-600 font-medium mb-2"
                htmlFor="total_score"
            >
                Total Score:
            </label>
            <input
                id="total_score"
                type="number"
                name="total_score"
                value={entry.total_score}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
            <div>
            <label
                className="block text-gray-600 font-medium mb-2"
                htmlFor="callaway_score"
            >
                Callaway Score:
            </label>
            <input
                id="callaway_score"
                type="number"
                name="callaway_score"
                value={entry.callaway_score}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
            >
            Save
            </button>
        </form>
    </div>
  );
};

export default AdminEdit;
