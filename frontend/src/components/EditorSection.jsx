// // import React, { useRef } from "react";
// // import Editor from "@monaco-editor/react";
// // import * as Y from "yjs";
// // import { WebrtcProvider } from "y-webrtc";
// // import { MonacoBinding } from "y-monaco";
// // import "./EditorSection.css";

// // const EditorSection = ({ setCode }) => {
// //   const editorRef = useRef(null);

// //   const handleEditorDidMount = (editor) => {
// //     editorRef.current = editor;
// //     const doc = new Y.Doc();
// //     const provider = new WebrtcProvider("test-room", doc);
// //     const type = doc.getText("monaco");
// //     new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);

// //     editor.onDidChangeModelContent(() => {
// //       const code = editor.getValue();
// //       setCode(code);
// //     });
// //   };

// //   return (
// //     <div className="editor-container">
// //       <Editor
// //         height="100%"
// //         width="100%"
// //         theme="vs-dark"
// //         language="cpp"
// //         onMount={handleEditorDidMount}
// //       />
// //     </div>
// //   );
// // };

// // export default EditorSection;



// import React, { useRef, useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import { WebsocketProvider } from "y-websocket";
// import { MonacoBinding } from "y-monaco";
// import "./EditorSection.css";

// const EditorSection = ({ setCode, roomName = "default-room" }) => {
//   const editorRef = useRef(null); // Reference to the Monaco editor
//   const [awarenessInfo, setAwarenessInfo] = useState([]); // Awareness state to track users

//   useEffect(() => {
//     const doc = new Y.Doc(); // Create a Yjs document
//     const provider = new WebrtcProvider(roomName, doc, {
//       signaling: ['ws://localhost:4444'],
//     }); // WebRTC provider with room name
//     // const provider = new WebsocketProvider(
//     //   "ws://localhost:1234",roomName,doc
//     // );
//     const type = doc.getText("monaco"); // Shared Yjs text type

//     let binding;

//     provider.awareness.setLocalStateField("user", {
//       name: `User-${Math.floor(Math.random() * 1000)}`, // Assign random user name for awareness
//       color: `hsl(${Math.random() * 360}, 100%, 75%)` // Random user color
//     });

//     // Update awareness info when users join/leave
//     const updateAwareness = () => {
//       const users = Array.from(provider.awareness.getStates().values()).map(
//         (state) => state.user
//       );
//       setAwarenessInfo(users);
//     };

//     provider.awareness.on("change", updateAwareness);

//     return () => {
//       // Cleanup on unmount
//       provider.disconnect();
//       doc.destroy();
//       if (binding) binding.destroy();
//     };
//   }, [roomName]);

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor; // Store the editor instance

//     // Bind Yjs text type to Monaco editor
//     const doc = new Y.Doc();
//     const provider = new WebrtcProvider(roomName, doc, {
//       signaling: ['ws://localhost:4444'],
//     });
//     // const provider = new WebsocketProvider(
//     //   "ws://localhost:1234",roomName,doc
//     // );
//     const type = doc.getText("monaco");

//     const binding = new MonacoBinding(
//       type,
//       editor.getModel(),
//       new Set([editor]),
//       provider.awareness
//     );

//     // Sync code changes with parent component
//     editor.onDidChangeModelContent(() => {
//       const code = editor.getValue();
//       setCode(code);
//     });
//   };

//   return (
//     <div className="editor-container">
//       <Editor
//         height="100%"
//         width="100%"
//         theme="vs-dark"
//         language="cpp"
//         onMount={handleEditorDidMount}
//       />
//       <div className="awareness-container">
//         <p>Active Users:</p>
//         {/* <ul>
//           {awarenessInfo.map((user, index) => (
//             <li key={index} style={{ color: user.color }}>
//               {user.name}
//             </li>
//           ))}
//         </ul> */}
//       </div>
//     </div>
//   );
// };

// export default EditorSection;



// // set HOST=localhost
// // set PORT=1234
// // npx y-websocket

// ---------------------------------------------------------------------------------------------------------------------------------------


import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import "./EditorSection.css";

const EditorSection = ({ setCode, roomName = "default-room" }) => {
  const editorRef = useRef(null); // Reference to the Monaco editor
  const ydocRef = useRef(null); // Reference to the Y.Doc
  const providerRef = useRef(null); // Reference to the WebrtcProvider
  const [awarenessInfo, setAwarenessInfo] = useState([]); // Awareness state to track users

  useEffect(() => {
    // Initialize Y.Doc and WebrtcProvider only once
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const provider = new WebrtcProvider(roomName, ydoc, {
      signaling: ['ws://localhost:4444'], // Use your signaling server
    });
    providerRef.current = provider;

    // Awareness local state setup
    provider.awareness.setLocalStateField("user", {
      name: `User-${Math.floor(Math.random() * 1000)}`,
      color: `hsl(${Math.random() * 360}, 100%, 75%)`
    });

    // Awareness info update
    const updateAwareness = () => {
      const users = Array.from(provider.awareness.getStates().values()).map(
        (state) => state.user
      );
      setAwarenessInfo(users);
    };

    provider.awareness.on("change", updateAwareness);
    // Cleanup on unmount
    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomName]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Bind Y.Doc text type to Monaco editor
    const ydoc = ydocRef.current;
    const provider = providerRef.current;
    const type = ydoc.getText("monaco");

    // Create MonacoBinding
    const binding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    // Sync code changes with parent component
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      setCode(code);
    });

    // Store binding in ref for cleanup
    providerRef.current.binding = binding;
  };

  return (
    <div className="editor-container">
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        language="cpp"
        onMount={handleEditorDidMount}
      />
      <div className="awareness-container">
        <p>Active Users:</p>
        <ul>
          {awarenessInfo.map((user, index) => (
            <li key={index} style={{ color: user.color }}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditorSection;


// --------------------------------------------------------------------------------------------------

