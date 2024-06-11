import React, { useState } from 'react';

const ScoreInput = ({ hole, onScoreChange }) => {
    const [score, setScore] = useState('');

    const handleChange = (e) => {
        const newScore = e.target.value;
        setScore(newScore);
        onScoreChange(hole, newScore);
    };

    return (
        <div>
            <label>Hole {hole}: </label>
            <input
                type='number'
                value={score}
                onChange={handleChange}
                min="1"
                max="10"
            />
        </div>
    );
};

export default ScoreInput;