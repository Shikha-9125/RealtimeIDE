// /src/App.jsx
// import { useState } from "react";
// import EditorPanel from "./components/EditorPanel"; // Import EditorPanel
// import OutputPanel from "./components/OutputPanel"; // Import OutputPanel
// import RunButton from "./components/RunButton"; // Import RunButton

// const App = () => {
//   const [output, setOutput] = useState(""); // State to hold API response

//   // Function to handle the API call
//   // const handleRunCode = async () => {
//   //   try {
//   //     const response = await fetch("YOUR_API_ENDPOINT_HERE", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         code: "your code here", // You will get this code from Monaco Editor state
//   //       }),
//   //     });

//   //     const data = await response.json();
//   //     setOutput(data.output); // Assuming the API returns an 'output' key
//   //   } catch (error) {
//   //     console.error("Error executing code:", error);
//   //     setOutput("Error occurred while executing code.");
//   //   }
//   // };
//   const handleRunCode = async () => {
//     setOutput("Compiling...");

//   try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             "language": "cpp",
//             "version": "10.2.0",
//               "files": [
//                   {
//                       "content": code
//                   }
//               ]
//           })
//       })

//       if(!response.ok){
//           const errorData = await response.json();
//           setOutput(Error ${response.status} : ${JSON.stringify(errorData)});
//         return;
//       }


//       const data = await response.json();
//       console.log(data);

//     setOutput(data.run.output);
//   } catch (error) {
//       console.error("Error fetching from piston api",error);
//       setOutput(Error : ${error.message});
//   }
// };
//   return (
//     <div className="flex h-screen">
//       {/* Left side: Editor */}
//       <div className="w-1/2 p-4 bg-gray-900">
//         <EditorPanel />
//       </div>

//       {/* Right side: Output */}
//       <div className="w-1/2 p-4">
//         {/* Use the RunButton component here */}
//         <RunButton onClick={handleRunCode} />
        
//         <OutputPanel output={output} /> {/* Display the output */}
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useState } from "react";
// import EditorPanel from "./components/EditorPanel"; // Import EditorPanel
// import OutputPanel from "./components/OutputPanel"; // Import OutputPanel
// import RunButton from "./components/RunButton"; // Import RunButton

// const App = () => {
//   const [output, setOutput] = useState(""); // State to hold API response
//   const [code, setCode] = useState(""); // State to hold code from the editor

//   // Function to handle the API call
//   const handleRunCode = async () => {
//     setOutput("Compiling...");

//     try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           language: "cpp",
//           version: "10.2.0",
//           files: [
//             {
//               content: code, // Pass the code from the state
//             },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setOutput(`Error ${response.status} : ${JSON.stringify(errorData)}`);
//         return;
//       }

//       const data = await response.json();
//       console.log(data);

//       setOutput(data.run.output); // Update output with the response
//     } catch (error) {
//       console.error("Error fetching from piston API", error);
//       setOutput(`Error : ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left side: Editor */}
//       <div className="w-1/2 p-4 bg-gray-900">
//         <EditorPanel onCodeChange={setCode} /> {/* Pass setCode as a prop */}
//       </div>

//       {/* Right side: Output */}
//       <div className="w-1/2 p-4">
//         {/* Use the RunButton component here */}
//         <RunButton onClick={handleRunCode} />

//         <OutputPanel output={output} /> {/* Display the output */}
//       </div>
//     </div>
//   );
// };

// export default App;

import { useState } from "react";
import EditorPanel from "./components/EditorPanel";
import OutputPanel from "./components/OutputPanel";
import RunButton from "./components/RunButton";

const App = () => {
  const [output, setOutput] = useState(""); // State to hold API response
  const [code, setCode] = useState(""); // State to store the editor's code

  // Function to handle the API call
  const handleRunCode = async () => {
    setOutput("Compiling...");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "cpp",
          version: "10.2.0",
          files: [
            {
              content: code, // Use the code from the editor
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        return;
      }

      const data = await response.json();
      setOutput(data.run.output);
    } catch (error) {
      console.error("Error fetching from piston API:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Editor */}
      <div className="w-1/2 p-4 bg-gray-900">
        <EditorPanel onCodeChange={setCode} /> {/* Pass the function to capture code */}
      </div>

      {/* Right side: Output */}
      <div className="w-1/2 p-4">
        <RunButton onClick={handleRunCode} /> {/* Button to trigger API call */}
        <OutputPanel output={output} /> {/* Display the output */}
      </div>
    </div>
  );
};

export default App;
