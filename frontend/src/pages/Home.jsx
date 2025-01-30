import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Navbar Section */}
            <nav className="navbar">
                <h1 className="logo">Realtime IDE</h1>
                <div className="nav-links">
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/signup" className="nav-button">Signup</Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="home-content">
                <h2>Welcome to Realtime IDE</h2>
                <p>Collaborate and code in real-time with others.</p>
                <div className="home-buttons">
                    <button className="btn" onClick={() => alert("Create New File")}>
                        Create New File
                    </button>
                    <button className="btn" onClick={() => alert("Open Existing File")}>
                        Open Existing File
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
