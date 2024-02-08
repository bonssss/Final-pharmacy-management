import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful:', data);

        // Save the pharmacyId to local storage for future use
        localStorage.setItem('pharmacyId',data.user._id);
      //  console.log(localStorage.getItem("pharmacyId"));
        // Call the onLogin prop to update the parent component
       onLogin();

        // Redirect to the home page
       navigate('/');
      } else {
        console.error('Login failed:', data.message);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className="loginpage">
      <div className="login-container" id="login-container">
        <h2 className="loginheader">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>

          <Link to="/register" className="create-account-link">
            Create new account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
