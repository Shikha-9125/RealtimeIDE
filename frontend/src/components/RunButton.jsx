import React from "react";

const RunButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
    >
      Run Code
    </button>
  );
};

export default RunButton;
