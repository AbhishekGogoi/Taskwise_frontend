import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f0f0",
  color: "#fff",
  padding: "2rem",
});

const StyledBox = styled(Box)({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1, // This allows the box to grow and center its contents
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  backgroundColor: "#0079bf",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#026aa7",
  },
});

const FirstPage = () => {
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/workspaces");
  };

  return (
    <StyledContainer>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "black", fontSize: "2rem", marginBottom: "15rem" }}
      >
        Welcome to TaskWise
      </Typography>
      <StyledBox>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "black", fontSize: "2rem" }}
        >
          It all starts with the Workspace
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: "black", fontSize: "1.5rem" }}
        >
          A Workspace is where work happens in TaskWise. You'll find your
          projects, tasks and group members here.
        </Typography>
        <StyledButton variant="contained" onClick={handleNextClick}>
          CONTINUE TO WORKSPACE
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default FirstPage;
