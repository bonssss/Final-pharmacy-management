
import React, { useState, useEffect, useRef } from 'react';
import { BsJustify, BsSearch } from 'react-icons/bs';
import { Settings } from '@mui/icons-material';
import { Person, Password, Logout } from '@mui/icons-material';
import ChangePassword from './Password/ChangePassword';
import EditProfile from './MyProfile/EditProfile';
// import './header.css'

function Header({ OpenSidebar , handleLogout}) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isChangePasswordFormVisible, setChangePasswordFormVisible] = useState(false);
  const [isMyProfileFormVisible, setMyProfileFormVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');


  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchIconClick = () => {
    setInputVisible(!isInputVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputVisible(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (action) => {
    if (action === 'Change Password') {
      setChangePasswordFormVisible(true);
    } else if (action === 'Edit Profile') {
      setMyProfileFormVisible(true);
    } else if (action === 'Logout') {
      // Handle Logout logic
      handleLogout(); 
    }
    setDropdownVisible(false); // Close the dropdown after clicking any menu item
  };

  const handlePasswordChangeCancel = () => {
    console.log('Password change form canceled');
    setChangePasswordFormVisible(false);
  };

  const closeMyProfileForm = () => {
    setMyProfileFormVisible(false);
  };

  const saveProfileData = (profileData) => {
    // Perform validation and save the profile data (API call, state update, etc.)
    console.log('Saving profile data:', profileData);
    // Close the form after saving
    closeMyProfileForm();
  };
  
  
  useEffect(() => {
    // Get current date and time and format it as 'MM/DD/YYYY hh:mm:ss AM/PM'
    const formattedDateTime = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    setCurrentDateTime(formattedDateTime);
  }, []);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <div className='search-container' ref={inputRef}>
        <BsSearch className='searchicon' onClick={handleSearchIconClick} />

          {isInputVisible && <input type="text" className='search-input' id='search' placeholder='search' />}
        </div>

      </div>
      <div className='date'>{currentDateTime}</div>

      
      <div className='header-right'>
        <div className='settings-icon-container' ref={dropdownRef}>
          <Settings className='icon' onClick={toggleDropdown} />
          {isDropdownVisible && (
            <div className='dropdown-menu'>
              <div onClick={() => handleMenuItemClick('Edit Profile')} className='setting-dropdown'>
                <Person className='setting-profile' /> My-Profile
              </div>
              <div onClick={() => handleMenuItemClick('Change Password')} className='setting-dropdown'>
                <Password /> Change Password
              </div>
              <div onClick={() => handleMenuItemClick('Logout')} className='setting-dropdown'>
                <Logout /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
      {isMyProfileFormVisible && <EditProfile onCancel={closeMyProfileForm} onSave={saveProfileData} />}
      {isChangePasswordFormVisible && <ChangePassword onCancel={handlePasswordChangeCancel} />}
    </header>
  );
}

export default Header;


