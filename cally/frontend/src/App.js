// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Leaderboard from './components/Leaderboard';
import ScoreCalculator from './components/ScoreCalculator';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App = () => {


  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(' ');

  return (
      <div className="min-h-screen bg-gray-300 flex flex-col">
          <Router>
              <NavBar />
              <div className="container mx-auto mt-4 flex-grow">
                  <Routes>
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/score-calculator" element={<ScoreCalculator />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} setToken={setToken} />} />
                      {isAdmin && <Route path="/admin" element={<AdminDashboard token={token} />} />}
                  </Routes>
              </div>
          </Router>
      </div>
  );
};

export default App;
