import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ProfileImage from "../assets/sample-pi.png";

const TaskView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { task, workspaceID } = location.state || {};
  const [taskDetails, setTaskDetails] = useState(task);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogTab, setDialogTab] = useState(0);

  const handleDialogOpen = (title) => {
    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setDialogTab(newValue);
  };

  const handleCancel = () => {
    if(workspaceID) {
      navigate(`/workspaces/${workspaceID}`);
    }
    navigate(`/my-tasks`);
  };

  useEffect(() => {
    // Update taskDetails state if task changes
    setTaskDetails(task);
  }, [task]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {taskDetails ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Title
              </Typography>
              <Typography>{taskDetails.name}</Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                Description
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={taskDetails.content}
                InputProps={{ sx: { mb: 3 } }}
              />

              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                Comments ({taskDetails.comments.length})
              </Typography>
              {taskDetails.comments.length > 0 && (
                <Box
                  sx={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    p: 1,
                  }}
                >
                  {taskDetails.comments.map((comment, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar alt="Profile Image" src={ProfileImage} />
                        </Grid>
                        <Grid item xs>
                          <Typography
                            sx={{ fontWeight: "bold", cursor: "pointer" }}
                          >
                            <Tooltip title={comment?.user?.email}>
                              {comment?.user?.username}
                            </Tooltip>
                          </Typography>
                          <Typography>{comment?.comment}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Assignee:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar alt="Profile Image" src={ProfileImage} sx={{ fontSize: 5 }} />
                      <Typography sx={{ ml: 1 }}>
                        {taskDetails?.assigneeUserID?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Created by:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar alt="Profile Image" src={ProfileImage} />
                      <Typography sx={{ ml: 1 }}>
                        {taskDetails?.createdBy?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Priority:
                    </Typography>
                    <Typography>{taskDetails.priority}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Due Date:
                    </Typography>
                    <Typography>
                      {task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Attachments ({taskDetails.attachments.length})
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleDialogOpen("")}
                    >
                      <ChevronRightSharpIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h4" color="error" align="center">
            Task not found
          </Typography>
        )}
        <Box mt={3}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCancel}
            sx={{
              backgroundColor: "#f0f0f0",
              "&:hover": { backgroundColor: "#d0d0d0" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Tabs value={dialogTab} onChange={handleTabChange} variant="fullWidth">
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImageOutlinedIcon sx={{ p: 1 }} />
                  <span>Media</span>
                </Box>
              }
            />
            <IconButton onClick={handleDialogClose} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton>
          </Tabs>

          <Box mt={2}>
            {taskDetails?.attachments.length > 0 ? (
              <Grid container spacing={2}>
                {taskDetails.attachments
                  .filter((attachment) => attachment.docType === "image")
                  .map((attachment, index) => (
                    <Grid item key={index} md={4} lg={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={attachment.docUrl}
                          alt={`Attachment ${index}`}
                          height="100"
                        />
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Typography sx={{ p: 2, textAlign: "center", color: "#888" }}>
                No media available
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TaskView;
