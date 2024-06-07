import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import { moveTaskAsync } from "../../features/project/projectSlice";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Dropdown = ({task,columnId}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const order = useSelector((state) => state?.project?.selectedProject?.order);
  const colIndex = order?.indexOf(columnId);
  //console.log(colIndex,"colIndex")
  const { id } = useParams();
  const taskId=task._id;
  const dispatch=useDispatch();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveLeft = () => {
    if (colIndex > 0) {
      const sourceColumnId = columnId;
      const destinationColumnId = order[colIndex - 1];
      const data={
        "sourceColumnId":sourceColumnId,
        "destinationColumnId":destinationColumnId
      }
      const idObject = { id: id, taskId };
      dispatch(moveTaskAsync({ data, idObject }));
    }
    handleClose();
  };

  const handleMoveRight = () => {
    if (colIndex < order?.length - 1) {
      const sourceColumnId = columnId;
      const destinationColumnId = order[colIndex + 1];
      const data={
        "sourceColumnId":sourceColumnId,
        "destinationColumnId":destinationColumnId
      }
      const idObject = { id: id, taskId };
      dispatch(moveTaskAsync({ data, idObject }));
    }
    handleClose();
  };

  const handleDelete =()=>{
      
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="neutral"
        size="small" // Set size to small
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {colIndex > 0 && (
          <MenuItem onClick={handleMoveLeft}>Move to left</MenuItem>
        )}
        {colIndex < order?.length - 1 && (
          <MenuItem onClick={handleMoveRight}>Move to right</MenuItem>
        )}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
    </div>
  );
};

export default Dropdown;
