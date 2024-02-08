// Parent component
import React from 'react';
import ChangePassword from './ChangePassword';

const ParentComponent = () => {
  const handleCancel = () => {
    // Logic for cancel action
    console.log('Cancel clicked');
  };

  const handleSubmit = (currentPassword, newPassword, confirmNewPassword) => {
    // Logic for form submission
    console.log('Form submitted');
  };

  return (
    <div>
      {/* Render the ChangePassword component and pass the onCancel and onSubmit props */}
      <ChangePassword onCancel={handleCancel} onSubmit={handleSubmit} />
    </div>
  );
};

export default ParentComponent;