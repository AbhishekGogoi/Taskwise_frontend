import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Projects_white from "../assets/Projects_white.png";
import "./Sidebar.css"

function Sidebar() {
    return (
        <Box className="sidebar">
            <List>
                <ListItem>
                    <ListItemButton className="list-item-button">
                        <ListItemIcon>
                            <img src={Projects_white} alt="Projects" className="list-item-img" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Projects"
                            primaryTypographyProps={{ className: 'list-item-text' }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton className="list-item-button">
                        <ListItemIcon>
                            <img src={Projects_white} alt="Projects" className="list-item-img" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Workspaces"
                            primaryTypographyProps={{ className: 'list-item-text' }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton className="list-item-button">
                        <ListItemIcon>
                            <img src={Projects_white} alt="Projects" className="list-item-img" />
                        </ListItemIcon>
                        <ListItemText
                            primary="My Tasks"
                            primaryTypographyProps={{ className: 'list-item-text' }}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton className="list-item-button">
                        <ListItemIcon>
                            <img src={Projects_white} alt="Projects" className="list-item-img" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Calendar"
                            primaryTypographyProps={{ className: 'list-item-text' }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default Sidebar;
