// FileExplorer.jsx
import React, { useState, useEffect } from 'react';
import './FileExplorer.css';

const FileExplorer = ({ onFileSelect, onCreateFile }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found - please log in again');
        }
        const response = await fetch(`http://localhost:5000/api/users/${userId}/files`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch files');
        
        const data = await response.json();
        const formattedFiles = data.map(file => ({
            _id: file.fileId,
            name: file.name
        }));
      
        setFiles(formattedFiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
        alert(error.message || 'Failed to fetch files');
      }
    };

    fetchFiles();
  }, []);

  const handleFileClick = async (file) => {
    setSelectedFile(file._id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/files/${file._id}/code`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch file content');
      
      const data = await response.json();
      onFileSelect({
        id: file._id, 
        content: data.codeBase,
        createdBy: data.createdBy,
      });
    }catch (error) {
      console.error('Error fetching file content:', error);
      alert(error.message || 'Failed to load file content');
    }
  };

 

  const handleNewFile = async () => {
    const fileName = prompt('Enter new file name:');
    if (fileName) {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found - please log in again');
        }
        const response = await fetch('http://localhost:5000/api/files/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId: userId,
            fileName: fileName,
            codeBase: '' 
        })
        });
        const responseData = await response.json();
        if (!response.ok) throw new Error('Failed to create file');
        const newFile = {
            _id: responseData.file.fileId,
            name: responseData.file.fileName,
            content: responseData.file.codeBase,
            createdAt: responseData.file.createdAt,
            createdBy: responseData.file.createdBy
        };
        setFiles(prevFiles => [...prevFiles, newFile]);
        onCreateFile(newFile);
        setSelectedFile(newFile._id);
      } catch (error) {
        console.error('Error creating file:', error);
        alert(error.message || 'Failed to create file');
      }
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-header">
        <h3>Explorer</h3>
        <button onClick={handleNewFile} className="new-file-btn">
          +
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading files...</div>
      ) : (
        <ul className="file-list">
          {files.map((file) => (
            <li
              key={file._id}
              className={`file-item ${selectedFile === file._id ? 'selected' : ''}`}
              onClick={() => handleFileClick(file)}
            >
              📄 {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;