import React from "react";
import { Typography, Tooltip } from "@mui/material";
import { useDrag } from "react-dnd";
import { Card, CardContent, Chip, Box } from "@mui/material";
import { DateRange, AttachFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

function Task({ task }) {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task?._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(task.dueDate));

  const handleCardClick = (e) => {
    // Only navigate if the click target is not the dropdown button
    if (e.target.closest(".dropdown")) {
      return;
    }
    navigate(`/tasks/${task._id}`);
  };

  const getChipProps = (priority) => {
    switch (priority) {
      case 'High':
        return { label: 'High', color: 'error' };
      case 'Medium':
        return { label: 'Medium', color: 'warning' };
      case 'Low':
      default:
        return { label: 'Low', color: 'success' };
    }
  };

  const chipProps = getChipProps(task.priority);

  return (
    <Box>
      <Card
        sx={{
          maxWidth: "300px", // Set max width
          minWidth: "250px", // Set min width
          maxHeight: "250px", // Set max height
          minHeight: "100px", // Set min height
        }}
        ref={drag} // Attach the drag source ref to the Card component
        style={{ cursor: "pointer", opacity: isDragging ? 0 : 1 }}
        className="draggable-item"
        onClick={handleCardClick}
      >
        <CardContent sx={{ p: "0.5rem" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Chip
              label={chipProps.label}
              color={chipProps.color}
              size="small"
              sx={{ fontSize: "0.4rem", height: "15px" }}
            />
            <Box className="dropdown">
              <Dropdown />
            </Box>
          </Box>
          <Typography variant="h6" component="div" sx={{ fontSize: "1rem" }}>
            {task.taskName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.4rem" }}
          >
            {task.content}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Tooltip title="Due Date">
              <Box display="flex" alignItems="center">
                <DateRange sx={{ fontSize: "0.75rem" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  ml={0.5}
                  sx={{ fontSize: "0.7rem" }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Tooltip>
            <Box display="flex" alignItems="center">
              <AttachFile sx={{ fontSize: "0.75rem" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                ml={0.5}
                sx={{ fontSize: "0.7rem" }}
              >
                {task.attachments?.length || 0}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Task;
