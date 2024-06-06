import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [selected, setSelected] = useState(() => {
    const pathSegments = location.pathname.split("/");
    return pathSegments.length > 1 ? pathSegments[1] : "projects";
  });

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <Box className="sidebar">
      <List>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/projects"
            className={`list-item-button ${
              selected === "projects" ? "selected" : ""
            }`}
            onClick={() => handleSelect("projects")}
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
              selected === "workspaces" ? "selected" : ""
            }`}
            onClick={() => handleSelect("workspaces")}
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
              selected === "my-tasks" ? "selected" : ""
            }`}
            onClick={() => handleSelect("my-tasks")}
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
              selected === "calendar" ? "selected" : ""
            }`}
            onClick={() => handleSelect("calendar")}
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
