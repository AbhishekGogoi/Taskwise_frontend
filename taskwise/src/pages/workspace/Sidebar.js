// Sidebar.js
import React from 'react';
import './Sidebar.css';
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul>
          <li>
            <DeveloperBoardOutlinedIcon className="sidebar-icon" />
            <a href="#projects">Projects</a>
          </li>
          <li>
            <WorkspacesOutlinedIcon className="sidebar-icon" />
            <a href="#workspaces">Workspaces</a>
          </li>
          <li>
            <AssignmentTurnedInOutlinedIcon className="sidebar-icon" />
            <a href="#mytasks">My Tasks</a>
          </li>
          <li>
            <CalendarTodayOutlinedIcon className="sidebar-icon" />
            <a href="#calendar">Calendar</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
