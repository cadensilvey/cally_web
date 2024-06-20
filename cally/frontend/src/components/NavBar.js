// NavBar.js
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    Cally 
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/leaderboard" className="text-white hover:text-gray-300">Leaderboard</Link>
                    <Link to="/score-calculator" className="text-white hover:text-gray-300">Score Calculator</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
