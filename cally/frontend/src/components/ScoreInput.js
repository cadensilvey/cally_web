import React, { useState } from "react";

const ScoreInput = ({ hole, onScoreChange, onNext }) => {
    const [score, setScore] = useState(0);

    const handleIncrement = () => {
        setScore(Math.min(score + 1, 10));
    };

    const handleDecrement = () => {
        setScore(Math.max(score - 1, 0)); 
    };

    const handleSubmit = () => {
        onScoreChange(hole, score);
        setScore(0);
        onNext();
    };

    return (
        <div className="pt-10 text-center my-4">
            <h2 className="text-xl font-semibold mb-2">Enter Score For Hole {hole}</h2>
            <div className="flex items-center justify-center">
                <button 
                    onClick={handleDecrement}
                    className="bg-gray-300 hover:bg-gray-500 text-gray-700 px-4 py-2 rounded"
                >
                    -
                </button>
                <span className="px-4">{score}</span>
                <button 
                    onClick={handleIncrement}
                    className="bg-gray-300 hover:bg-gray-500 text-gray-700 px-4 py-2 rounded"
                >
                    +
                </button>
            </div>
            <button 
                onClick={handleSubmit}
                className="mt-4 bg-green-700 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded"
            >
                Submit
            </button>            
        </div>
    );
};

export default ScoreInput;
