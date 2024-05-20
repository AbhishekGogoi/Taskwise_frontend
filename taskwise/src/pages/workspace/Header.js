// Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import LogoImage from "../../Assets/TaskWiseLogo.png";
import ProfileImage from "../../Assets/sample-pi.png";

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Logo = styled('img')(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: '280px',
  height: '100px',
  [theme.breakpoints.down('sm')]: {
    width: '140px',
    height: '50px',
  },
}));

const SectionRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const ProfileImg = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  marginLeft: theme.spacing(2),
}));

const Header = () => {
  return (
    <Root>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Logo src={LogoImage} alt="Logo" />
          <SectionRight>
            <IconButtonStyled color="inherit">
              <NotificationsIcon />
            </IconButtonStyled>
            <IconButtonStyled color="inherit">
              <ProfileImg src={ProfileImage} alt="Profile" />
              <ArrowDropDownIcon />
            </IconButtonStyled>
          </SectionRight>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default Header;
