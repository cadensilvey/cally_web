import React, { useState, useEffect } from "react";
import axios from "axios";
import Scorecard from "../callaway";  // adjust the path as necessary

const ScorecardLeaderboard = () => {
    const [scorecards, setScorecards] = useState([]);
    const [error, setError] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);

    const fetchScorecard = async () => {
        try {
            const response = await axios.get('http://localhost:3000/scorecard');
            const scorecardData = response.data.map(entry => {
                const list = Object.keys(entry)
                    .filter(key => key.startsWith('hole'))
                    .map(key => entry[key]);
                return new Scorecard(list, entry.name);
            });
            setScorecards(scorecardData);
        } catch (error) {
            console.error("There was an error getting the scorecard:", error);
            setError('There was an error fetching the scorecard. Please try again.');
        }
    };

    useEffect(() => {
        fetchScorecard();
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
        <div>
            <h1 className="text-2xl font-bold mb-4">Scorecards</h1>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="divide-y divide-gray-200 rounded-lg shadow-lg overflow-hidden">
                {scorecards
                    .sort((a, b) => a.calc() - b.calc()) // Sort scorecards by Callaway score in descending order
                    .map((scorecard, index) => {
                        let bgColor = 'bg-white'; // Default background color
                        if (index === 0) bgColor = 'bg-yellow-300'; // Gold for 1st place
                        else if (index === 1) bgColor = 'bg-gray-300'; // Silver for 2nd place

                        return (
                            <li 
                                key={index} 
                                className={`${bgColor} hover:bg-blue-100`} 
                                onClick={() => openModal(scorecard.id)} // Ensure correct function reference
                            >
                                <div className="flex items-center p-4">
                                    <span className="font-semibold mr-4">{index + 1}</span>
                                    <span className="mr-8">{scorecard.getName()}</span>
                                    <span className="mr-8">{scorecard.getScorecard().join('  ')}</span>
                                    <span className="mr-8">Total Score: {scorecard.totalScore()}</span>
                                    <span className="mr-8">Calculated Score: {scorecard.calc()}</span>
                                    <span className="mr-8">Adjustment: {scorecard.getAdjustment()}</span>
                                    <span className="mr-8">Deduction: {scorecard.getDeduction()}</span>
                                </div>
                            </li>
                        );
                    })}
            </ul>
            {/* MODAL FOR DISPLAYING ROUND STATS */}
            {selectedRound && (
                <>
                    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
                        {/* background overlay for the blur effect */}
                    </div>
                    <div className="fixed z-50 inset-0 flex items-center justify-center min-h-screen p-4">
                        {/* MODAL CONTENT */}
                        <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Round Stats</h3>
                                <button onClick={closeModal} className="text-gray-600">&times;</button>
                            </div>
                            <p>Team Name: {selectedRound.name}</p>
                            {/* Add more stats as needed */}
                            <p>Score: {selectedRound.score}</p>
                            {/* Example stat; replace with actual data */}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ScorecardLeaderboard;
