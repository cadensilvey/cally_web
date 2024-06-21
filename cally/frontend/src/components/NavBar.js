// NavBar.js
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-white shadow-xl p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-green-800 font-bold text-2xl">
                    Cally Golf
                </div>
                <div className="flex space-x-6">
                    <Link to="/" className="text-gray-700 text-lg hover:text-green-700">Home</Link>
                    <Link to="/score-calculator" className="text-gray-700 text-lg hover:text-green-700">Enter Scores</Link>
                    <Link to="/leaderboard" className="text-gray-700 text-lg hover:text-green-700">Leaderboard</Link>
                    <Link to="/admin-login" className="text-gray-700 text-lg hover:text-green-700">Admin Login</Link>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
