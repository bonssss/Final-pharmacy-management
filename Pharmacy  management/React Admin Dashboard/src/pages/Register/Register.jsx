import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./register.css"

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    pharmacyName: '',
    ownerName: '',
    pharmacyLicenseNumber: '',
    location: '',
    email: '',
    contactNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [pharmacyId, setPharmacyId] = useState(null); // New state to store pharmacyId
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (registrationData.password !== registrationData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update state with the received pharmacyId
        setPharmacyId(data.pharmacyId);
        navigate('/login');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='registermaincontainer'>
      <div className='registercontainer'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pharmacyName">Pharmacy Name:</label>
        <input
          type="text"
          id="pharmacyName"
          name="pharmacyName"
          value={registrationData.pharmacyName}
          onChange={handleChange}
        />

        <label htmlFor="ownerName">Owner Name:</label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={registrationData.ownerName}
          onChange={handleChange}
        />

        <label htmlFor="pharmacyLicenseNumber">Pharmacy License Number:</label>
        <input
          type="text"
          id="pharmacyLicenseNumber"
          name="pharmacyLicenseNumber"
          value={registrationData.pharmacyLicenseNumber}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={registrationData.location}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registrationData.email}
          onChange={handleChange}
        />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={registrationData.contactNumber}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={registrationData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registrationData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={registrationData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
        <Link to="/login">Already have an account</Link>
      </form>
      </div>
    </div>
  );
};

export default Register;