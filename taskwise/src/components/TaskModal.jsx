import React from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const Attachments = styled("img")({
  width: "100px",
  height: "auto",
  marginRight: "10px",
});

const TaskModal = ({ open, handleClose, task }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "17%",
          right: "2%",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #ccc",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {task?.Workspace}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {task?.Task}
        </Typography>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Due Date:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{task?.DueDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Priority:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "red" }}>
              {task?.Priority}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Status:</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "green" }}>
              {task?.Status}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Attachments</strong>
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <Attachments src="path/to/image1.png" alt="Attachment 1" />
          <Attachments src="path/to/image2.png" alt="Attachment 2" />
        </Box>
        <TextField
          fullWidth
          placeholder="Ask question or post an update"
          multiline
          rows={4}
          variant="outlined"
          sx={{ bgcolor: "white" }}
        />
      </Box>
    </Modal>
  );
};

export default TaskModal;
