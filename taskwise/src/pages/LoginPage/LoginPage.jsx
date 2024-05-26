import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  InputAdornment, // For adding icons to TextFields
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { styled } from "@mui/system";
import googleiconnew from "../../assets/googleiconnew.png";
import TaskWiseLogo from "../../assets/TaskWiseLogo.png";

// Styles
const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "2rem",
  elevation: 10,
  borderRadius: "8px", // Add padding to the container
});

const StyledForm = styled("form")(({ theme }) => ({
  width: 350,
  paddingLeft: "4rem",
  paddingRight: "4rem",
  paddingBottom: "1.5rem",
  paddingTop: "4rem",
  border: "1px solid #e0e0e0",
  borderRadius: "40px",

  // Responsive adjustments using theme breakpoints
  [theme.breakpoints.down("md")]: {
    paddingLeft: "2rem", // Reduce padding on medium screens and smaller
    paddingRight: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "1rem", // Further reduce padding on small screens
    paddingRight: "1rem",
    width: "100%", // Make it full width
    paddingTop: "2rem", // Adjust top padding
    paddingBottom: "2rem", // Adjust bottom padding
  },
}));

const StyledGoogleButton = styled(Button)({
  height: 50, // Increase button height
  fontSize: "1rem",
  backgroundColor: "#ffffff",
  color: "#000000",
  "&:hover": {
    backgroundColor: "",
  },
  textTransform: "none", // Remove uppercase transformation
});

const StyledTypography = styled(Typography)({
  fontFamily: "Manrope, sans-serif", // Example font (adjust as needed)
  fontWeight: 600,
  fontSize: "30px", // Slightly bolder font
});

const StyledLink = styled(Link)({
  color: "#0062ff",
  fontSize: "15px",
  fontWeight: 650,
  textDecoration: "none", // Remove default underline
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer", // Add underline on hover
  }, // Example link color
});

const StyledTitleContainer = styled(Box)({
  // New container for title
  marginBottom: "1rem", // Add some space below the title
  textAlign: "center", // Center align the title
});

const StyledDivider = styled(Typography)({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#808080", // Light gray color
  fontSize: "20px", // Adjust font size as needed
  fontWeight: 700, // Lighter font weight
  "&::before, &::after": {
    // Create lines on both sides
    content: '""',
    flex: 1,
    borderBottom: "1px solid #e0e0e0", // Use a light gray border
    margin: "3px", // Add spacing between lines and text
  },
});

const StyledSignUpLink = styled(Link)({
  color: "#0062ff", // Blue link color
  fontWeight: 650,
  fontSize: "18px", // Semi-bold font weight
  textDecoration: "none", // Remove default underline
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer", // Add underline on hover
  },
});

const StyledButton = styled(Button)({
  height: 50, // Increase button height
  fontSize: "1rem", // Adjust font size (optional)
});

// Component
const LoginPage = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword"); // Navigate to forgot password page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to signup page
  };

  return (
    <StyledContainer>
      <img
        src={TaskWiseLogo}
        alt="TaskWise Logo"
        style={{
          width: 300,
          maxWidth: "80%",
          height: "auto",
          marginBottom: "2rem",
          display: "block", // Make the image a block element
          margin: "0 auto", // Center it horizontally
        }}
      />
      <StyledForm sx={{ boxShadow: 3 }}>
        <StyledTitleContainer>
          <StyledTypography component="h1" variant="h5" align="center">
            Log In
          </StyledTypography>
        </StyledTitleContainer>
        <TextField // Email field with icon
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="Your email" // Adjusted label
          name="email"
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField // Password field with icon
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <StyledButton // Login button style adjustments
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: "1rem",
            backgroundColor: "#0062ff", // Example color
            "&:hover": { backgroundColor: "#303f9f" }, // Darker hover
          }}
        >
          Log In
        </StyledButton>

        <StyledLink
          onClick={handleForgotPasswordClick}
          variant="body2"
          sx={{ display: "block", textAlign: "center", marginTop: "1.5rem" }}
        >
          Forgot password?
        </StyledLink>

        <StyledDivider sx={{ margin: "1rem 0" }}>or</StyledDivider>

        <StyledGoogleButton
          fullWidth
          variant="contained"
          startIcon={
            <img
              style={{ width: "28px", height: "28px" }}
              src={googleiconnew}
              alt="Google"
            />
          }
        >
          Sign in with Google
        </StyledGoogleButton>
      </StyledForm>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: "1.5rem",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", color: "#969AB8", fontWeight: 650 }}
          variant="body2"
        >
          Don't have an account?
        </Typography>
        <StyledSignUpLink
          onClick={handleSignUpClick}
          variant="body2"
          sx={{ marginTop: "0.3rem" }}
        >
          Sign Up
        </StyledSignUpLink>
      </Box>
    </StyledContainer>
  );
};

export default LoginPage;
