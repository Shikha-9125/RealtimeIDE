// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/signup", {
//         username,
//         email,
//         password,
//       });
//       console.log("Signup Successful:", response.data);
//       alert("Signup Successful! You can now log in.");
//     } catch (error) {
//       console.error("Signup Failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Signup Failed!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
// import React, { useState } from "react";
// import './signup.css'; // Import the CSS

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/signup", {
//         username,
//         email,
//         password,
//       });
//       console.log("Signup Successful:", response.data);
//       alert("Signup Successful! You can now log in.");
//     } catch (error) {
//       console.error("Signup Failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Signup Failed!");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Signup</button>
//       </form>
//       <p>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios"; // Import axios
import './signup.css'; // Import the CSS

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true); // Disable button while loading
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Signup Successful:", response.data);
      alert("Signup Successful! You can now log in.");
    } catch (error) {
      console.error("Signup Failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup Failed! Please try again.");
    } finally {
      setLoading(false); // Enable button after loading is finished
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
