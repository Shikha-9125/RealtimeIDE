import { useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

const EditorPanel = ({ onCodeChange }) => {
  const editorRef = useRef(null);

  // This function is triggered when the editor is mounted
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Real-time collaboration logic with Yjs
    const doc = new Y.Doc();
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  };

  // Triggered when the editor content changes
  const handleEditorChange = (value) => {
    onCodeChange(value); // Send the updated code to the parent component
  };

  return (
    <div className="w-full h-full">
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark" // Dark theme
        language="cpp" // Enable C++ syntax highlighting
        defaultValue="// Write your C++ code here" // Placeholder text
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorPanel;
