import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { createProjectAIASync } from "../../features/AI/projectAISlice";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > :not(style)": {
    margin: theme.spacing(1),
    width: "98%",
  },
  paddingTop: "2rem",
}));

const WhiteBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "98%",
  height: "65vh",
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(2),
  paddingTop: "4rem",
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(8),
  width: "30%",
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

  const [prompt, setPrompt] = useState("");

  const handleButtonClick = () => {
    const data = {
      prompt: prompt,
    };
    dispatch(createProjectAIASync(data));
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ p: 2, fontWeight: "bold" }}
        >
          Workspace A
        </Typography>
      </Paper>
      <Container>
        <WhiteBox>
          <FormBox>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ paddingLeft: "6rem", color: "#3780ED" }}
            >
              Create Project with TaskWise AI
            </Typography>
            <TextField
              label="Enter Project Name"
              variant="outlined"
              fullWidth
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
            <TextField label="Enter Team Size" variant="outlined" fullWidth />
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
              src="illustration-url" // Replace with your illustration image URL or import
              alt="Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </ImageBox>
        </WhiteBox>
      </Container>
    </>
  );
};

export default AIInputPage;
