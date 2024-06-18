import React, { useState } from "react";

const NameInput = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="text-center my-4">
      <label className="text-xl font-semibold mb-2">
        Enter your team name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ml-2 p-2 border rounded"
        />
      </label>
      <button type="submit" className="ml-4 bg-green-700 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default NameInput;
