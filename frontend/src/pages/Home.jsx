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
        <p>Here, you can collaborate with your team to work on various projects, share your code, and get real-time feedback!</p>
        <p>Use the editor to write your code and execute it seamlessly with others.</p>
    </div>
</div>

        </div>
    );
};

export default Home;
