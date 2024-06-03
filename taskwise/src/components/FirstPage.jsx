import React from "react";
import { Button, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";
import LogoImage from "../assets/TaskWiseLogo.png"; // Ensure the correct path to your logo
import WorkspaceView from "../assets/WorkspaceView.png"; // Ensure the correct path to your sample image

// Global styles to remove margins and padding from body and html
const GlobalStyles = styled("div")({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body": {
    width: "100%",
    height: "100%",
  },
});

// Styled components
const StyledContainer = styled(Box)({
  display: "flex",
  minHeight: "99vh",
  padding: "0",
  width: "99.1vw",
});

const LeftPane = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  backgroundColor: "#f0f0f0",
  paddingBottom: "5rem",
  paddingLeft: "2rem",
  color: "#000",
});

const RightPane = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  backgroundColor: "#d9d9d9",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  backgroundColor: "#0b5fae",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0b5fae",
  },
});

const FirstPage = () => {
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/workspaces");
  };

  return (
    <>
      <GlobalStyles />
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/projects">
              <Box
                component="img"
                sx={{
                  display: { md: "flex" },
                  mr: 1,
                  height: { xs: 30, md: 40, lg: 50, xl: 60 },
                  cursor: "pointer",
                }}
                alt="Logo"
                src={LogoImage}
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <StyledContainer>
        <LeftPane>
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem" }}>
            It all starts with the Workspace
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.5rem" }}>
            A Workspace is where work happens in TaskWise. You'll find your
            projects, tasks and group members here.
          </Typography>
          <StyledButton variant="contained" onClick={handleNextClick}>
            CONTINUE TO WORKSPACE
          </StyledButton>
        </LeftPane>
        <RightPane>
          <Box
            component="img"
            sx={{
              width: "80%",
              height: "auto",
            }}
            alt="Sample"
            src={WorkspaceView} // Ensure you provide the correct path to the sample image
          />
        </RightPane>
      </StyledContainer>
    </>
  );
};

export default FirstPage;
