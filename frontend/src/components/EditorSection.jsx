import React, { useRef, useEffect, useState } from "react";
  import Editor from "@monaco-editor/react";
  import * as Y from "yjs";
  import { WebrtcProvider } from "y-webrtc";
  import { MonacoBinding } from "y-monaco";
  import "./EditorSection.css";

  const EditorSection = ({code, setCode, activeFile}) => {
    console.log("ActiveFileId in editor Section:", activeFile);
    const editorRef = useRef(null); 
    const ydocRef = useRef(null); 
    const providerRef = useRef(null); 
    const [awarenessInfo, setAwarenessInfo] = useState([]);

    const cleanup = () => {
      if (providerRef.current) {
        providerRef.current.destroy();
        ydocRef.current.destroy();
        providerRef.current = null;
        ydocRef.current = null;
      }
    };

    
    useEffect(() => {
      cleanup(); // Cleanup old instances before initializing
    
      if (!ydocRef.current) {
        ydocRef.current = new Y.Doc(); // Ensure only one Yjs doc is created
      }
    
      console.log("Joining Yjs room:", activeFile);
    
      if (!providerRef.current) {
        providerRef.current = new WebrtcProvider(activeFile, ydocRef.current, {
          signaling: ['ws://localhost:4444'],
        });
      }
    
      const ytext = ydocRef.current.getText("monaco");
    
      providerRef.current.on('synced', (isSynced) => {
        console.log("Synced with Yjs document, current content:", ytext.toString());
    
        setTimeout(() => {
          if (ytext.toString().trim().length === 0) {
            console.log("First user detected, inserting initial content:", code);
            ytext.insert(0, code);
          } else {
            console.log("Yjs already contains data, using existing content.");
            setCode(ytext.toString()); // Ensure we load existing Yjs content
          }
        }, 1000);
      });
    
      providerRef.current.awareness.setLocalStateField("user", {
        name: `User-${Math.floor(Math.random() * 1000)}`,
        color: `hsl(${Math.random() * 360}, 100%, 75%)`
      });
    
      ytext.observe(() => {
        console.log("Yjs document updated:", ytext.toString());
        setCode(ytext.toString()); // Update editor when Yjs changes
      });
    
      return () => {
        providerRef.current.off('synced');
        cleanup();
      };
    }, [activeFile]);
    
    const handleEditorDidMount = (editor) => {
      editorRef.current = editor;
      const ydoc = ydocRef.current;
      const provider = providerRef.current;
      const ytext = ydoc.getText("monaco");
    
      console.log("Binding Yjs to Monaco editor...");
    
      // Ensure Monaco is bound to Yjs
      new MonacoBinding(ytext, editor.getModel(), new Set([editor]), provider.awareness);
    
      // Listen for local changes and update Yjs
      editor.onDidChangeModelContent(() => {
        const currentCode = editor.getValue();
        console.log("Editor content changed, updating Yjs:", currentCode);
        if (ytext.toString() !== currentCode) {
          ytext.delete(0, ytext.length);
          ytext.insert(0, currentCode);
        }
      });
    
      // Ensure Monaco starts with the Yjs content
      editor.setValue(ytext.toString());
    };
    
    return (
      <div className="editor-container">
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          language="cpp"
          value={code}
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