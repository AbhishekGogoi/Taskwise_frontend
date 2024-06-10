import React, { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAIASync } from "../../features/AI/projectAISlice";
import IllustrationImage from "../../assets/IllustrationImage.jpeg";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > :not(style)": {
    margin: theme.spacing(1),
    width: "98%",
  },
}));

const WhiteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "98%",
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(2),
  paddingTop: "4rem",
}));


const AIInputPage = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state?.workspace?.workspaces);
  const [workspace, setWorkspace] = useState('');
  const [projectName, setProjectName] = useState(null);
  const [description, setDescription] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.projectName = projectName ? "" : "Project Name is required";
    tempErrors.description = description ? "" : "Project Description is required";
    tempErrors.workspace = workspace ? "" : "Workspace assignment is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleButtonClick = async () => {
    if (validate()) {
      const data = {
        prompt: `I am building a "${projectName}" project. Come up with a set of development tasks needed to build this project. Give the result in JSON format example as below.
        {
          "project": "${projectName}",
          "description": "${description}",
          "tasks": [
            {
              "title": "Setup Repo",
              "description": "setup both frontend and backend repo"
            },
            {
              "title": "Config Database",
              "description": "setup Database MySQL"
            }
            // Add more tasks as needed
          ]
        }`,
      };
  
      try {
        const res = await dispatch(createProjectAIASync(data));
        console.log(res);
        navigate(`/task-carousel`, { state: res.payload.data.tasks }); // Pass data here
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    }
  };
  
  const handleWorkspaceChange = (event) => {
    const { value } = event.target;
    setWorkspace(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      workspace: value ? "" : "Workspace assignment is required",
    }));
  };
  const handleProjectNameChange = (event) => {
    const { value } = event.target;
    setProjectName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      projectName: value ? "" : "Project Name is required",
    }));
  };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setDescription(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: value ? "" : "Project Description is required",
    }));
  };

  return (
    <>
      <Container >
        <WhiteBox >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
            }}
          >
            <Box sx={{
              flex: 1,
              pl: '2rem',
              order: { xs: 2, md: 1 },
            }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  paddingLeft: "5rem",
                  color: "#3780ED",
                  mb: 4
                }}
              >
                Create Project with TaskWise AI
              </Typography>
              <TextField
                label="Enter Project Name"
                value={projectName}
                variant="outlined"
                onChange={handleProjectNameChange}
                fullWidth
                error={!!errors.projectName}
                helperText={errors.projectName}
                sx={{ marginBottom: "1.6rem" }}
              />
              <TextField
                label="Enter Project Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                error={!!errors.description}
                helperText={errors.description}
                onChange={handleDescriptionChange}
                sx={{ marginBottom: "1.6rem" }}
              />
              <FormControl
                fullWidth
                margin="normal"
                style={{ marginBottom: "40px" }}
                error={!!errors.workspace}
              >
                <InputLabel id="assign-workspace-label">
                  Assign Workspace
                </InputLabel>
                <Select
                  labelId="assign-workspace-label"
                  id="assign-workspace"
                  label="Assign Workspace"
                  value={workspace}
                  onChange={handleWorkspaceChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {workspaces.map((workspace) => (
                    <MenuItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.workspace && <FormHelperText>{errors.workspace}</FormHelperText>}
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00c6ff",
                  backgroundImage: "linear-gradient(120deg, #00c6ff, #8e71df)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "100%",
                }}
                onClick={handleButtonClick}
              >
                Generate with TaskWise AI
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                order: { xs: 1, md: 2 },
              }}
            >
              <img
                src={IllustrationImage} // Replace with your illustration image URL or import
                alt="Illustration"
                style={{ maxWidth: "80%", height: "auto", backgroundColor: "transparent" }}
              />
            </Box>
          </Box>
        </WhiteBox>
      </Container>
    </>
  );
};

export default AIInputPage;
