# Realtime Collaborative IDE

## Overview  
Realtime Collaborative IDE is a web-based platform that allows multiple users to collaborate on code in real time. It provides a seamless coding experience by leveraging *WebRTC, **WebSockets, and **Yjs* for efficient and low-latency synchronization. This project is ideal for remote pair programming, coding interviews, and team-based coding sessions.  

## Features  
- *Live code collaboration* – Multiple users can edit code simultaneously.  
- *Real-time synchronization* – Uses WebRTC for direct peer-to-peer connections.  
- *WebSocket fallback* – Ensures smooth connectivity when WebRTC fails.  
- *Monaco Editor* – Provides an enhanced code editing experience.  
- *User awareness system* – Displays active users in a session.  

## Technologies Used  
- *Frontend:* React, Tailwind CSS  
- *Backend:* Node.js, Express  
- *Realtime Synchronization:* Yjs, WebRTC, WebSockets  
- *Editor:* Monaco Editor  
- *Database:* MongoDB (for user authentication and session management)  

## Getting Started  
### Prerequisites  
Ensure you have the following installed:  
- *Node.js* (v18+ recommended)  
- *npm* or *yarn*  
- Clone the WebRTC repository from GitHub to your project to start the signaling server:  
  ```sh
  git clone https://github.com/yjs/y-webrtc
  cd y-webrtc
  npm install
  cd bin
  node server.js
  ```

## Installation  
Follow these steps to set up the project locally:  

### Prerequisites  
- Node.js (Latest LTS version recommended)  
- MongoDB (Installed locally or using a cloud service like MongoDB Atlas)  

### Steps  
```sh
# Clone the repository
git clone https://github.com/Shikha-9125/RealtimeIDE.git
cd RealtimeIDE

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory and configure required variables (e.g., MongoDB connection string, API keys)

# Start the backend server
node server.js

# Start the frontend
npm run dev

# Open the project in the browser at http://localhost:3000
```

### Running the Y-WebRTC Signaling Server  
The project requires a signaling server for WebRTC-based synchronization. Follow these steps to set it up:  
```sh
# Clone the y-webrtc repository
git clone https://github.com/yjs/y-webrtc.git
cd y-webrtc

# Navigate to the bin folder
cd bin

# Start the signaling server
node server.js

# The server will start on port 4444 by default
```

The application will be available at *http://localhost:5173/* (or another port if 5173 is occupied).  

## Debugging Issues  
### 1. WebRTC Not Connecting  
- Ensure port *4444* is not blocked.  
- Check if another WebRTC instance is running and restart the backend.  

### 2. WebSocket Fallback Not Working  
- Verify that the WebSocket server is running properly.  
- Check for console errors in the browser.  

### 3. Port Conflicts  
If EADDRINUSE occurs, find and kill the process using the port:  
```sh
npx kill-port 5000
```
Then restart the backend.  

## Demo Video 🎥  
Watch the project in action: [Click here to watch the demo](https://drive.google.com/file/d/1ciBFa_Z7OR2ZQu8mzn9M9skOcYJw5Xnb/view?usp=sharing)  

Feel free to open issues and contribute! 🚀



