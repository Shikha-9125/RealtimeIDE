
// import { useState } from "react";
// import EditorPanel from "./components/EditorPanel";
// import OutputPanel from "./components/OutputPanel";
// import RunButton from "./components/RunButton";

// const App = () => {
//   const [output, setOutput] = useState(""); // State to hold API response
//   const [code, setCode] = useState(""); // State to store the editor's code

//   // Function to handle the API call
//   // const handleRunCode = async () => {
//   //   setOutput("Compiling...");
//   const handleStdinChange = (e) => {
//     setStdin(e.target.value);
//   };
//     try {
//       // const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify({
//       //     language: "cpp",
//       //     version: "10.2.0",
//       //     files: [
//       //       {
//       //         content: code, // Use the code from the editor
//       //       },
//       //     ],
//       //   }),
//       // });
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "language": "cpp",
//             "version": "10.2.0",
//             "files": [
//                 {
//                     "content": code
//                 }
//             ],
//             "stdin": stdin
//         })
//     });
//       if (!response.ok) {
//         const errorData = await response.json();
//         setOutput(`Error ${response.status}: ${JSON.stringify(errorData)}`);
//         return;
//       }

//       const data = await response.json();
//       setOutput(data.run.output);
//     } catch (error) {
//       console.error("Error fetching from piston API:", error);
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left side: Editor */}
//       <div className="w-1/2 p-4 bg-gray-900">
//         <EditorPanel onCodeChange={setCode} /> {/* Pass the function to capture code */}
//       </div>

//       {/* Right side: Output */}
//       <div className="w-1/2 p-4">
//         <RunButton onClick={handleRunCode} /> {/* Button to trigger API call */}
//         <OutputPanel output={output} /> {/* Display the output */}
//       </div>
//     </div>
    
//   );
// };

// export default App;

import { useState, useRef } from "react";
import EditorPanel from "./components/EditorPanel";
import OutputPanel from "./components/OutputPanel";
import RunButton from "./components/RunButton";

const App = () => {
  const [output, setOutput] = useState(""); // State to hold API response
  const [code, setCode] = useState(""); // State to store the editor's code
  const [stdin, setStdin] = useState(""); // State to store user input for stdin
  const stdinRef = useRef(null); // Ref for the stdin textarea (optional but helpful for focus management)

  // Function to handle changes to the stdin textarea
  const handleStdinChange = (e) => {
    setStdin(e.target.value);
  };

  // Function to handle the API call
  const handleRunCode = async () => {
    setOutput("Compiling..."); // Show a compiling message while the API is being called

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "cpp", // Specify the programming language
          version: "10.2.0", // Compiler version
          files: [{ content: code }], // Pass the code from the editor
          stdin: stdin, // Pass the stdin input
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        return;
      }

      const data = await response.json();
      setOutput(data.run.output || "No output received"); // Update the output state
    } catch (error) {
      console.error("Error fetching from Piston API:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Editor */}
      <div className="w-1/2 p-4 bg-gray-900">
        <EditorPanel onCodeChange={setCode} /> {/* Pass the function to capture code */}
      </div>

      {/* Right side: Output and Stdin */}
      <div className="w-1/2 p-4 bg-gray-800 text-white">
        {/* Run Button */}
        <RunButton handleRunCode={handleRunCode} /> {/* Button to trigger API call */}

        {/* Standard Input (stdin) */}
        <div className="mt-4">
          <label className="block text-white font-medium mb-2">Standard Input (stdin):</label>
          <textarea
            ref={stdinRef}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 bg-gray-700 text-white"
            rows="4"
            value={stdin}
            onChange={handleStdinChange}
            placeholder="Enter your standard input here..."
          />
        </div>

        {/* Output Panel */}
        <OutputPanel output={output} /> {/* Display the output */}
      </div>
    </div>
  );
};

export default App;
