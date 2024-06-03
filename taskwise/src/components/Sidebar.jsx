import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Projects_white from "../assets/Projects_white.png";
import WorkspaceIconWhite from "../assets/WorkspaceIconWhite.png";
import MyTaskIconWhite from "../assets/MyTaskIconWhite.png";
import CalendarWhite from "../assets/CalendarWhite.png";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    switch (location.pathname) {
      case "/projects":
        return 0;
      case "/workspaces":
        return 1;
      case "/my-tasks":
        return 2;
      case "/calendar":
        return 3;
      default:
        return 0;
    }
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/projects":
        setSelectedIndex(0);
        break;
      case "/workspaces":
        setSelectedIndex(1);
        break;
      case "/my-tasks":
        setSelectedIndex(2);
        break;
      case "/calendar":
        setSelectedIndex(3);
        break;
      default:
        setSelectedIndex(0);
    }
  }, [location.pathname]);

  return (
    <Box className="sidebar">
      <List>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/projects"
            className={`list-item-button ${
              selectedIndex === 0 ? "selected" : ""
            }`}
            onClick={() => setSelectedIndex(0)}
          >
            <ListItemIcon>
              <img
                src={Projects_white}
                alt="Projects"
                className="list-item-img"
              />
            </ListItemIcon>
            <ListItemText
              primary="Projects"
              primaryTypographyProps={{ className: "list-item-text" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/workspaces"
            className={`list-item-button ${
              selectedIndex === 1 ? "selected" : ""
            }`}
            onClick={() => setSelectedIndex(1)}
          >
            <ListItemIcon>
              <img
                src={WorkspaceIconWhite}
                alt="Workspaces"
                className="list-item-img"
              />
            </ListItemIcon>
            <ListItemText
              primary="Workspaces"
              primaryTypographyProps={{ className: "list-item-text" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/my-tasks"
            className={`list-item-button ${
              selectedIndex === 2 ? "selected" : ""
            }`}
            onClick={() => setSelectedIndex(2)}
          >
            <ListItemIcon>
              <img
                src={MyTaskIconWhite}
                alt="My_Tasks"
                className="list-item-img"
              />
            </ListItemIcon>
            <ListItemText
              primary="My Tasks"
              primaryTypographyProps={{ className: "list-item-text" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/calendar"
            className={`list-item-button ${
              selectedIndex === 3 ? "selected" : ""
            }`}
            onClick={() => setSelectedIndex(3)}
          >
            <ListItemIcon>
              <img
                src={CalendarWhite}
                alt="Calendar"
                className="list-item-img"
              />
            </ListItemIcon>
            <ListItemText
              primary="Calendar"
              primaryTypographyProps={{ className: "list-item-text" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
