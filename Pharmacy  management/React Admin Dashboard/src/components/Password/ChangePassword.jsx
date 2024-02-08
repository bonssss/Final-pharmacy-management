import React, { useState } from 'react';
import './changepassword.css';

const ChangePassword = ({ onSubmit, onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords and handle form submission logic
    onSubmit(currentPassword, newPassword, confirmNewPassword);
  };

  const handleCancel = () => {
    // Clear input fields and close the form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    // Call the onCancel function if it is provided
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <div className="change-password-container">
      
      <form onSubmit={handleSubmit} className="change-password-form">
      <h2>Change Password</h2>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Change Password</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
