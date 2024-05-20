// Sidebar.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Hidden from '@mui/material/Hidden';
import { styled } from '@mui/system';

const drawerWidth = 240;

const SidebarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #07357A 0%, #3984F3 100%)',
    color: 'white',
    marginTop: theme.spacing(12), // Adjust for AppBar height
  },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
    padding: 20,
  '&:hover': {
    backgroundColor: '#4a90e2',
  },
}));

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Divider />
      <List>
        {['Projects', 'Workspaces', 'My Tasks', 'Calendar'].map((text, index) => {
          let icon;
          switch (text) {
            case 'Projects':
              icon = <DeveloperBoardOutlinedIcon />;
              break;
            case 'Workspaces':
              icon = <WorkspacesOutlinedIcon />;
              break;
            case 'My Tasks':
              icon = <AssignmentTurnedInOutlinedIcon />;
              break;
            case 'Calendar':
              icon = <CalendarTodayOutlinedIcon />;
              break;
            default:
              icon = <MailIcon />;
              break;
          }
          return (
            <ListItemStyled key={text}>
              <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemStyled>
          );
        })}
      </List>
    </div>
  );

  return (
    <SidebarContainer>
      <Hidden smUp>
        <DrawerStyled
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </DrawerStyled>
      </Hidden>
      <Hidden smDown>
        <DrawerStyled variant="permanent" open>
          {drawer}
        </DrawerStyled>
      </Hidden>
    </SidebarContainer>
  );
};

export default Sidebar;
