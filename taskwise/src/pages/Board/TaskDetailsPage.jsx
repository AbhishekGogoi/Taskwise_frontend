import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Box,
  Typography,
  IconButton,
  Paper,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const TaskDetailsPage = () => {
  const navigate=useNavigate()
  const { taskID } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    content: "",
    assignees: "",
    priority: "",
    dueDate: "",
    comment: "",
  });

  const coldata = useSelector(
    (state) => state?.project?.selectedProject?.columns
  );
  const titlesAndIds = coldata.map((item) => ({
    title: item.title,
    id: item._id,
  }));

  const selectedProject = useSelector((state) => state.project.selectedProject);
  const taskData = selectedProject ? selectedProject.tasks : [];

  const filteredTask = taskData.find((eachData) => eachData._id === taskID);
  console.log("FD", selectedProject);

  useEffect(() => {
    if (filteredTask) {
      setTaskDetails({
        taskName: filteredTask.taskName || "",
        content: filteredTask.content || "",
        assignees: filteredTask.assignees || "",
        priority: filteredTask.priority || "",
        comment: filteredTask.comment || "",
        dueDate: filteredTask.dueDate ? filteredTask.dueDate.split("T")[0] : "",
      });
    }
  }, [filteredTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
      <ToastContainer />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10rem",
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
          {filteredTask ? (
            <Grid container spacing={20}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                >
                  Task title
                </Typography>

                <Typography sx={{ mb: 3 }}>{taskDetails?.taskName}</Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                >
                  Task description
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Description"
                  multiline
                  rows={4}
                  name="content"
                  value={taskDetails.content}
                  onChange={handleChange}
                  sx={{
                    mb: 4,
                  }}
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Ask a question or add a comment"
                  sx={{
                    mb: 4,
                  }}
                />
                <Typography>{taskDetails.comment}</Typography>

                <Box sx={{ mt: 3, mb: 4 }}>
                  <TextField
                    label="Select due date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dueDate"
                    value={taskDetails?.dueDate}
                    onChange={handleChange}
                    sx={{
                      height: 32,
                      width: "100%",
                      maxWidth: 200,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                    >
                      Assign to
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        ml: 4,
                      }}
                    >
                      <Select
                        sx={{
                          height: 32,
                          width: "100%",
                          maxWidth: 200,
                        }}
                        name="assignee"
                        value={taskDetails?.assignees}
                        onChange={handleChange}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value="Option 1">Option 1</MenuItem>
                        <MenuItem value="Option 2">Option 2</MenuItem>
                        <MenuItem value="Option 3">Option 3</MenuItem>
                      </Select>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                    >
                      Priority
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        ml: 6,
                      }}
                    >
                      <Select
                        sx={{
                          height: 32,
                          width: "100%",
                          maxWidth: 200,
                        }}
                        name="priority"
                        value={taskDetails.priority}
                        onChange={handleChange}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                    >
                      Status
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        ml: 6,
                      }}
                    >
                      <Select
                        sx={{
                          height: 32,
                          width: "100%",
                          maxWidth: 200,
                          ml: 1,
                        }}
                        name="priority"
                        value={taskDetails.priority}
                        onChange={handleChange}
                      >
                        <MenuItem value="" disabled>
                          Set Status
                        </MenuItem>
                        {titlesAndIds.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                    >
                      Attachments
                    </Typography>
                    <Box sx={{ ml: "3rem" }}>
                      <IconButton>
                        <AddOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h4" color="error">
              Task not found
            </Typography>
          )}
          <Box sx={{ mt: 5, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    backgroundColor: "#f0f0f0",
                    "&:hover": {
                      backgroundColor: "#d0d0d0",
                    },
                  }}
                  onClick={()=>navigate(-1)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Save Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TaskDetailsPage;