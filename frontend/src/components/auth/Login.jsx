// src/components/Auth/Login.jsx
// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       console.log("Login Successful:", response.data);
//       localStorage.setItem("token", response.data.token); // Save token in localStorage
//       alert("Login Successful!");
//     } catch (error) {
//       console.error("Login Failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Login Failed!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";
// import { FaUser, FaLock } from "react-icons/fa"; // Icons for better UI

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       console.log("Login Successful:", response.data);
//       localStorage.setItem("token", response.data.token); // Save token in localStorage
//       alert("Login Successful!");
//     } catch (error) {
//       console.error("Login Failed:", error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || "Login Failed!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Welcome Back</h2>
//         <p className="subtitle">Please log in to continue</p>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <FaUser className="icon" />
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <FaLock className="icon" />
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         <p className="signup-text">
//           Don't have an account? <a href="#">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import './Login.css'; // Make sure this line is at the top

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });
      localStorage.setItem("token", response.data.token); // Save token in localStorage
      alert("Login Successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-header">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="footer-text">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
