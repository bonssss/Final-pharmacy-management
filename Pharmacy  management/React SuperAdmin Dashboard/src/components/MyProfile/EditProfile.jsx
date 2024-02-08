import React, { useState } from 'react';
import './editprofile.css'; // You can create a CSS file for styling

const EditProfile= ({ onCancel, onSave }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    // Add more profile fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation or API calls here before saving the profile data
    onSave(profileData);
  };

  return (
    <div className="change-profile-container">
    <div className="my-profile-form">
      <h2>Edit My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add more profile fields here */}
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditProfile;
