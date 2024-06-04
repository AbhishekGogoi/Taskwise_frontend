import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Avatar
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { editTaskAsync } from "../../features/project/projectSlice"; // Import the update task action
import ProfileImage from "../../assets/sample-pi.png";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskID } = useParams();
  const dispatch = useDispatch();

  const [initialTaskDetails, setInitialTaskDetails] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    content: "",
    assignees: "",
    priority: "",
    dueDate: "",
  });

  // const coldata = useSelector(
  //   (state) => state.project?.selectedProject?.columns
  // );
  const pid = useSelector(
    (state) => state?.project?.selectedProject?.id
  );
  console.log(pid, "pid")
  // const titlesAndIds = coldata?.map((item) => ({
  //   title: item.title,
  //   id: item._id,
  // }));

  const selectedProject = useSelector((state) => state.project.selectedProject);
  const taskData = selectedProject ? selectedProject.tasks : [];
  const membersData = useSelector((state) => state?.project?.workspaceMembers?.data);
  console.log(membersData, "members in task details")
  const filteredTask = taskData.find((eachData) => eachData._id === taskID);
  console.log(filteredTask, "filteredTask");

  function mapCommentsWithUserData() {
    return filteredTask?.comments?.map(comment => {
      const user = membersData?.find(user => user.user.id === comment._id);
      if (user) {
        return {
          email: user.user.email,
          imgUrl: user.user.imgUrl,
          comment: comment.comment
        };
      } else {
        return {
          email: null,
          imgUrl: null,
          comment: comment.comment
        };
      }
    });
  }



  useEffect(() => {
    if (filteredTask) {
      const details = {
        taskName: filteredTask.taskName || "",
        content: filteredTask.content || "",
        assignees: filteredTask.assignees || "",
        priority: filteredTask.priority || "",
        dueDate: filteredTask.dueDate ? filteredTask.dueDate.split("T")[0] : "",
      };
      setTaskDetails(details);
      setInitialTaskDetails(details); // Set the initial task details
      const mappedData = mapCommentsWithUserData();
      console.log(mappedData, "mapped data for comment");
    }
  }, [filteredTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const findChangedFields = (initial, current) => {
    const changedFields = {};
    for (const key in initial) {
      if (initial[key] !== current[key]) {
        changedFields[key] = current[key];
      }
    }
    return changedFields;
  };

  const handleSaveTask = () => {
    const data = findChangedFields(initialTaskDetails, taskDetails);
    if (Object.keys(data).length > 0) {
      console.log(data, "changedFields");
      const idObject = {
        taskId: taskID,
        id: pid
      }
      //dispatch(updateTaskAsync({ taskDetails: changedFields, taskID }));
      dispatch(editTaskAsync({ data, idObject }))
      toast.success("Task updated successfully!");
      navigate(-1)
    } else {
      toast.info("No changes to save.");
    }
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
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      alt="Profile Image"
                      src={ProfileImage}
                      sx={{
                        width: { xs: 15, md: 20, lg: 25, xl: 30 },
                        height: { xs: 15, md: 20, lg: 25, xl: 30 },
                      }}
                    />

                    <Box sx={{ ml: 3 }}>
                      <Typography>Name</Typography>
                      <Typography>omment</Typography>
                    </Box>
                  </Box>
                </Grid>
               
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
                        name="assignees"
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
                    {/* <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "700", mb: 1, fontSize: "1rem" }}
                    >
                      Status
                    </Typography> */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        ml: 6,
                      }}
                    >
                      {/* <Select
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
                      </Select> */}
                    </Box>
                  </Grid>
                  <Box sx={{ mt: 3, mb: 4, ml:17 }}>
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
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSaveTask}
                >
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
