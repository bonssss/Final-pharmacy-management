// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './login.css'
import moh from '../../assets/minis.png'


const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if username and password are correct
    if (username === "moh" && password === "1234") {
      // Call the handleLogin function to set the loggedIn state to true
      handleLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
        <div className="image-container">
        {/* Add your image here */}
        <img src={moh} alt="Your Image" />
      </div>
    <div className="login-container">
      <h1>Login To MOH Ethiopia</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-login" type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
