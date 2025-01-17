// /src/components/OutputPanel.js
// /src/components/OutputPanel.jsx

import React from 'react';

const OutputPanel = ({ output }) => {
  return (
    <div className="w-full h-full p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold">Output:</h2>
      <pre className="bg-white p-4 mt-4 border rounded-lg">{output}</pre>
    </div>
  );
};

export default OutputPanel;
