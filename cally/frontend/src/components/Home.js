// Home.js (inside components directory)
import React from 'react';
import HeroBanner from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
// import Group from '../assets/group.jpg';
// import Winners from '../assets/winners.jpg';

const Home = () => {
    return (
        <div className="min-h-px  justify-center items-center ">
            <div className="relative w-full h-100 md:h-96 overflow-hidden rounded-xl">
                <img src={HeroBanner} alt="Golf Course" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Callaway Golf Scoring App</h1>
                    <p className="text-lg md:text-xl mb-8">Welcome to the ultimate companion for tracking scores and managing your golf rounds.</p>
                    <div className="space-y-4">
                        {/* Add buttons here when ready */}
                    </div>
                </div>
            </div>

            {/* Content Boxes */}
            <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Box 1: Team Picture with Details */}
                {/* <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Team Picture</h2>
                    <img src={Group} alt="Team" className="w-full h-auto mb-4 rounded-lg" />
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida ex nec lorem lacinia, at vehicula nunc dapibus.</p>
                </div> */}

                {/* Box 2: Winners from Last Year */}
                {/* <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Winners from Last Year</h2>
                    <img src={Winners} alt="Winners" className="w-full h-auto mb-4 rounded-lg" />
                    <p className="text-sm text-gray-600">Phasellus feugiat turpis eu risus viverra consectetur. Nulla posuere libero id varius vehicula.</p>
                </div> */}

                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4">Enter a New Round</h2>
                    <Link to="/score-calculator" className="bg-green-800 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out inline-block">
                        Enter a Round
                    </Link>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Check out the Leaderboard</h2>
                        <Link to="/leaderboard" className="bg-green-800 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out inline-block">
                            Leaderboard
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
