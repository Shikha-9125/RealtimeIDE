// backend/server.js
// backend/server.js

// Import required modules
import express from "express"; // Import Express
import dotenv from "dotenv"; // Import dotenv for environment variables
import cors from "cors"; // Import cors for handling Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Import body-parser to parse JSON payloads
import connectDB from "./config/db.js"; // Import the database connection function

// Load environment variables
dotenv.config(); // This reads your .env file and loads the variables into process.env

// Connect to MongoDB
connectDB(); // Calls the function to connect to MongoDB using the connection string from your .env file

// Initialize Express application
const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable JSON parsing for incoming requests

// Example Routes (you can add real routes here)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000; // Define the port (default to 5000 if not in .env)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
