// Workspace.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Hidden from '@mui/material/Hidden';

const drawerWidth = 240;

const AppContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  marginTop: theme.spacing(8), // Height of the AppBar
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const Workspace = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppContainer>
      <HeaderContainer>
        <Hidden smUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginLeft: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Header />
      </HeaderContainer>
      <ContentWrapper>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <MainContent>
          <h1>Content</h1>
          {/* Add your workspace content here */}
        </MainContent>
      </ContentWrapper>
    </AppContainer>
  );
};

export default Workspace;
