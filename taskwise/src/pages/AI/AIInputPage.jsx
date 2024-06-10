import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { createProjectAIASync } from "../../features/AI/projectAISlice";
import AI from "../../assets/ai.png";
import { useNavigate } from 'react-router-dom';

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "50%",
  paddingLeft: "3rem",
}));

const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
}));

const AIInputPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  const handleButtonClick = () => {
    const data = {
      projectName: projectName,
      prompt: prompt,
      workspaceName: workspaceName,
    };
    dispatch(createProjectAIASync(data));
    navigate(`/task-carousel`);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <FormBox>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ color: "#3780ED", textAlign: "center" }}
          >
            Create Project with TaskWise AI
          </Typography>
          <TextField
            label="Enter Project Name"
            variant="outlined"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            label="Enter Project Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <TextField
            select
            label="Select Workspace Name"
            variant="outlined"
            fullWidth
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          >
            <MenuItem value="Workspace A">Workspace A</MenuItem>
            <MenuItem value="Workspace B">Workspace B</MenuItem>
            <MenuItem value="Workspace C">Workspace C</MenuItem>
          </TextField>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00c6ff",
              backgroundImage: "linear-gradient(120deg, #00c6ff, #8e71df)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
            fullWidth
            onClick={handleButtonClick}
          >
            Generate with TaskWise AI
          </Button>
        </FormBox>
        <ImageBox>
          <img
            src={AI}
            alt="Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </ImageBox>
      </Paper>
    </>
  );
};

export default AIInputPage;
