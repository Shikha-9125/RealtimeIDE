import { useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import {WebrtcProvider} from "y-webrtc"
import {MonacoBinding} from "y-monaco"
// import './App.css'
//setup monaco editor
//attach yjs text to monaco editor
function App() {
  const editorRef = useRef(null);
// editor value--> YJS text value (A text value shared by multiple people)
//one person deletes text -> deletes from the overall shared text value
//handled by YJS

//Initialise YJS tell it to listen to our monaco instance for changes 

function handleEditorDidMount(editor,monaco){
   editorRef.current = editor;
   const doc = new Y.Doc();
   const provider = new WebrtcProvider("test-room",doc);
   const type = doc.getText("monaco");
   const binding = new MonacoBinding(type,editorRef.current.getModel(),new Set([editorRef.current]),provider.awareness);
   console.log(provider.awareness);

}
  return (
    <Editor
    height="100vh"
    width="100vw"
    theme="vs-dark"
    onMount={handleEditorDidMount}
    />
  )
}

export default App
