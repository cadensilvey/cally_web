// src/App.js
import React from "react";
import ScoreCalculator from "./components/ScoreCalculator";

const App = () => {
  return (
    <div className="pt-10 items-center justify-center h-screen">
      <h1 className="text-5xl font-semibold mb-2 text-center">Callaway Score Input</h1>
      <ScoreCalculator />
    </div>
  );
};

export default App;
