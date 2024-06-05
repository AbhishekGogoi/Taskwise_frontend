import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';

const ColumnDropdown = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const order = useSelector((state) => state.project.selectedProject.order);
  const colId = column._id;
  const colIndex = order.indexOf(colId);


  const handleMoveLeft = () => {
    if (colIndex > 0) {
      const newOrder = [...order];
      [newOrder[colIndex - 1], newOrder[colIndex]] = [newOrder[colIndex], newOrder[colIndex - 1]];
      //dispatch(updateColumnOrder(newOrder));
    }
    handleClose();
  };

  const handleMoveRight = () => {
    if (colIndex < order.length - 1) {
      const newOrder = [...order];
      [newOrder[colIndex + 1], newOrder[colIndex]] = [newOrder[colIndex], newOrder[colIndex + 1]];
      //dispatch(updateColumnOrder(newOrder));
    }
    handleClose();
  };


  return (
    <div>
      <IconButton
        aria-controls={open ? 'column-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="neutral"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="column-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {colIndex > 0 && (
          <MenuItem onClick={handleMoveLeft}>Move to left</MenuItem>
        )}
        {colIndex < order.length - 1 && (
          <MenuItem onClick={handleMoveRight}>Move to right</MenuItem>
        )}
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ColumnDropdown;
