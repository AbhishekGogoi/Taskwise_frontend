import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { createProjectAIASync } from "../../features/AI/projectAISlice";
import IllustrationImage from "../../assets/IllustrationImage.jpeg"
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

  const handleButtonClick = async () => {
    const data = {
      prompt: prompt,
    };
    const res = await dispatch(createProjectAIASync(data));
    console.log(res)
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
              padding: '2rem',
              order: { xs: 2, md: 1 },
            }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  paddingLeft: "6rem",
                  color: "#3780ED",
                  mb: 4
                }}
              >
                Create Project with TaskWise AI
              </Typography>
              <TextField
                label="Enter Project Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "1.6rem" }}
              />
              <TextField
                label="Enter Project Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ marginBottom: "1.6rem" }}
              />
              
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
