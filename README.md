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

### Installation
```sh
# Clone the repository
git clone https://github.com/yourusername/realtime-ide.git
cd realtime-ide

# Install dependencies
cd frontend
npm install
cd ../backend
npm install
```

### Running the Project
#### Start Backend Server
```sh
cd backend
node server.js
```

#### Start Frontend
```sh
cd frontend
npm run dev
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
Watch the project in action: [Click here to watch the demo](https://your-video-link.com)



Feel free to open issues and contribute! 🚀

