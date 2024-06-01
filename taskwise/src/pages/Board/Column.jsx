import { Typography, IconButton, Box,TextField, Button  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import ColumnDropdown from "./ColumnDropdown";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function Column({ column, tasks, onDrop }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [editTitle, setEditTitle] = useState(column.title);
  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop({
    accept: "task", // Specify the accepted item type here
    drop: (item) => onDrop(item.id, column._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  //console.log("column re renders")

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleSave = () => {
    setTitle(editTitle);
    setIsEditing(false);
    // Here you can also add the logic to save the updated title to your backend if needed
  };

  const handleCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      {isEditing ? (
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <TextField
              value={editTitle}
              onChange={handleTitleChange}
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
            />
            <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="secondary">
            <CancelIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={handleTitleClick}>
            {title}
          </Typography>
        )}
        <ColumnDropdown /> {/* Replace the AddIcon with ColumnDropdown */}
      </Box>
      <Box
        ref={drop}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          minWidth: { xs: "100%", sm: "300px" },
          minHeight: { xs: "400px", sm: "600px" },
          maxWidth: { xs: "100%", sm: "300px" },
          maxHeight: { xs: "100%", sm: "600px" },
          p: 2,
          overflow: "auto", // Optional: add overflow to handle large number of tasks
          '&::-webkit-scrollbar': {
            display: 'none', 
          },
        }}
      >
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </Box>
    </Box>
  );
}

export default Column;
