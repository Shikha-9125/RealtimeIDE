// /src/components/OutputPanel.js
// /src/components/OutputPanel.jsx

import React from 'react';

const OutputPanel = ({ output }) => {
  return (
    <div className="w-full h-full p-4 bg-gray-800">
      <h2 className="text-white font-medium mb-2">Output:</h2>
      <pre className="h-auto bg-white p-4 mt-4 border rounded-lg text-black">{output}</pre>
    </div>
  );
};

export default OutputPanel;
