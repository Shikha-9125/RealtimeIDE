// import React, { useState } from "react";
// import "./FileSection.css";

// const FileSection = ({ files, setFiles, setCurrentFile }) => {
//   const [newFileName, setNewFileName] = useState("");

//   const handleCreateFile = () => {
//     if (newFileName.trim() === "") return;
//     const newFile = { name: newFileName, content: "" };
//     setFiles([...files, newFile]);
//     setCurrentFile(newFile);
//     setNewFileName("");
//   };

//   return (
//     <div className="file-section">
//       <h3>Files</h3>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index} onClick={() => setCurrentFile(file)}>
//             {file.name}
//           </li>
//         ))}
//       </ul>
//       <div className="new-file">
//         <input
//           type="text"
//           placeholder="New file name"
//           value={newFileName}
//           onChange={(e) => setNewFileName(e.target.value)}
//         />
//         <button onClick={handleCreateFile}>+</button>
//       </div>
//     </div>
//   );
// };

// export default FileSection;
