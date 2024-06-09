import React, { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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


const AIInputPage = () => {
  const dispatch = useDispatch();

  const [prompt, setPrompt] = useState("");
  const [projectName, setProjectName] = useState(null);
  const [description, setDescription] = useState(null);
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
                value={projectName}
                variant="outlined"
                onChange={(e) => setProjectName(e.target.value)}
                fullWidth
                sx={{ marginBottom: "1.6rem" }}
              />
              <TextField
                label="Enter Project Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: "1.6rem" }}
              />
              <FormControl
                fullWidth
                margin="normal"
                style={{ marginBottom: "40px" }}
              >
                <InputLabel id="assign-workspace-label">
                  Enter Team Size
                </InputLabel>
                <Select
                  labelId="assign-workspace-label"
                  id="assign-workspace"
                  label="Assign Workspace"
                >

                  <MenuItem >
                    Option 1
                  </MenuItem>
                  <MenuItem >
                    Option 2
                  </MenuItem>
                  <MenuItem >
                    Option 3
                  </MenuItem>
                </Select>
                {/* {!!errors.workspace && (
                  <Typography color="error">{errors.workspace}</Typography>
                )} */}
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
