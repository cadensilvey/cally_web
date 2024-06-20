// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Leaderboard from './components/Leaderboard';
import ScoreCalculator from './components/ScoreCalculator';

const App = () => {
    return (
        <Router>
            <NavBar />
            <div className="container mx-auto mt-4">
                <Routes>
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/score-calculator" element={<ScoreCalculator />} />
                    <Route path="/" element={<div>Home</div>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
