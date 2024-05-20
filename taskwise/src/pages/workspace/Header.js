import React from 'react';
import './Header.css';
import Logo_Image from "../../Assets/TaskWiseLogo.png";
import Logo from "../../Assets/sample-pi.png";
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header({ accountImage }) {
  return (
    <header className="header">
      <div className="left-side">
        <img src={Logo_Image} alt="Logo Icon" className="logo-icon" />
      </div>
      <div className="right-side">
        <NotificationsSharpIcon className="notification-icon" />
        <div className="account-container">
          {accountImage ? (
            <img src={accountImage} alt="Account" className="account-image" />
          ) : (
            <img src={Logo} alt="Account" className="account-image" />
          )}
          <ArrowDropDownIcon className="dropdown-arrow" />
        </div>
      </div>
    </header>
  );
}

export default Header;
