// import React, { useState } from "react";
// import EditorSection from "./components/EditorSection";
// import OutputSection from "./components/OutputSection";
// import StdinSection from "./components/StdinSection";
// import RunButton from "./components/RunButton";
// import "./App.css";

// function App() {
//   const [output, setOutput] = useState("");
//   const [code, setCode] = useState("");
//   const [stdin, setStdin] = useState("");

//   const handleRunCode = async () => {
//     setOutput("Compiling...");

//     try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           language: "cpp",
//           version: "10.2.0",
//           files: [
//             {
//               content: code
//             }
//           ],
//           stdin
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setOutput(`Error ${response.status} : ${JSON.stringify(errorData)}`);
//         return;
//       }

//       const data = await response.json();
//       setOutput(data.run.output);
//     } catch (error) {
//       setOutput(`Error : ${error.message}`);
//     }
//   };

//   return (
//     <div className="app-container">
//       <EditorSection setCode={setCode} />
//       <div className="right-panel">
//         <RunButton handleRunCode={handleRunCode} />
//         <OutputSection output={output} />
//         <StdinSection stdin={stdin} setStdin={setStdin} />
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import EditorSection from "./components/EditorSection";
// import OutputSection from "./components/OutputSection";
// import StdinSection from "./components/StdinSection";
// import RunButton from "./components/RunButton";
// import "./App.css";

// function App() {
//   const [output, setOutput] = useState("");
//   const [code, setCode] = useState("");
//   const [stdin, setStdin] = useState("");

//   const handleRunCode = async () => {
//     setOutput("Compiling...");

//     try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           language: "cpp",
//           version: "10.2.0",
//           files: [
//             {
//               content: code
//             }
//           ],
//           stdin
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setOutput(`Error ${response.status} : ${JSON.stringify(errorData)}`);
//         return;
//       }

//       const data = await response.json();
//       setOutput(data.run.output);
//     } catch (error) {
//       setOutput(`Error : ${error.message}`);
//     }
//   };

//   return (
//     <div className="app-container">
//       <EditorSection setCode={setCode}/>
//       <div className="right-panel">
//         <RunButton handleRunCode={handleRunCode} />
//         <OutputSection output={output} />
//         <StdinSection stdin={stdin} setStdin={setStdin} />
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import EditorSection from "./components/EditorSection";
// import OutputSection from "./components/OutputSection";
// import StdinSection from "./components/StdinSection";
// import RunButton from "./components/RunButton";
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import "./App.css";

// function App() {
//   const [output, setOutput] = useState("");
//   const [code, setCode] = useState("");
//   const [stdin, setStdin] = useState("");

//   const handleRunCode = async () => {
//     setOutput("Compiling...");

//     try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           language: "cpp",
//           version: "10.2.0",
//           files: [
//             {
//               content: code
//             }
//           ],
//           stdin
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setOutput(`Error ${response.status} : ${JSON.stringify(errorData)}`);
//         return;
//       }

//       const data = await response.json();
//       setOutput(data.run.output);
//     } catch (error) {
//       setOutput(`Error : ${error.message}`);
//     }
//   };

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/" element={
//         <div className="app-container">
//           <EditorSection setCode={setCode} />
//           <div className="right-panel">
//             <RunButton handleRunCode={handleRunCode} />
//             <OutputSection output={output} />
//             <StdinSection stdin={stdin} setStdin={setStdin} />
//           </div>
//         </div>
//       } />
//     </Routes>
//   );
// }

// export default App;
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import EditorSection from "./components/EditorSection";
import OutputSection from "./components/OutputSection";
import StdinSection from "./components/StdinSection";
import RunButton from "./components/RunButton";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import "./App.css";

function App() {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");

  const handleRunCode = async () => {
    setOutput("Compiling...");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language: "cpp",
          version: "10.2.0",
          files: [
            {
              content: code
            }
          ],
          stdin
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`Error ${response.status} : ${JSON.stringify(errorData)}`);
        return;
      }

      const data = await response.json();
      setOutput(data.run.output);
    } catch (error) {
      setOutput(`Error : ${error.message}`);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <div className="app-container">
            <EditorSection setCode={setCode} />
            <div className="right-panel">
              <RunButton handleRunCode={handleRunCode} />
              <OutputSection output={output} />
              <StdinSection stdin={stdin} setStdin={setStdin} />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;

