import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../../features/user/userSlice";
import {
  Container,
  Box,
  TextField,
  InputAdornment, // For adding icons to TextFields
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material"; // Import Person icon for username
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Joi from "joi";
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
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const signupError = useSelector((state) => state.user.signupError);
  // console.log(signupError?.message);

  const schema = Joi.object({
    username: Joi.string().min(3).required().messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email",
      }),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-Z0-9!@#\\$%\\^&\\*\\(\\)_\\+\\-=[\\]{};:'\",<>\\.\\?/`~]{7,}$"
        )
      )
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be at least 7 characters and contain only letters, numbers, and special characters",
      }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const { error } = schema.validate(
      { username, email, password, confirmPassword },
      { abortEarly: false }
    );

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(signupAsync({ username, email, password })); // Exclude confirmPassword
  };

  useEffect(() => {
    if (signupError) {
      toast.error(signupError.message);
    }
  }, [signupError]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/projects");
    }
  }, [loggedInUser, navigate]);

  const handleLoginClick = () => {
    navigate("/login");
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
            Sign Up
          </StyledTypography>
        </StyledTitleContainer>
        <TextField // Username field with icon
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          placeholder="Username" // Adjusted label
          name="username"
          autoComplete="username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField // Confirm Password field with icon
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <StyledButton // Sign Up button style adjustments
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: "1rem",
            backgroundColor: "#0062ff", // Example color
            "&:hover": { backgroundColor: "#303f9f" }, // Darker hover
          }}
          onClick={handleSignup}
        >
          Sign Up
        </StyledButton>

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
          Already have an account?
        </Typography>
        <StyledSignUpLink
          onClick={handleLoginClick}
          variant="body2"
          sx={{ marginTop: "0.3rem" }}
        >
          Log In
        </StyledSignUpLink>
      </Box>
      <ToastContainer />
    </StyledContainer>
  );
};

export default SignupPage;
