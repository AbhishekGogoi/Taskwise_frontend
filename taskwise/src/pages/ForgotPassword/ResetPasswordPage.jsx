import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TaskWiseLogo from "../../assets/TaskWiseLogo.png";
import forgotpasswordlogo from "../../assets/forgotpasswordlogo.jpeg";

const theme = createTheme();

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  marginBottom: "6rem",
  padding: theme.spacing(4),
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0062ff",
  height: 50,
  fontSize: "1rem",
  borderRadius: "10px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    "&.Mui-focused fieldset": {
      borderColor: "#80bdff",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
    "&.Mui-focused": {
      color: "#80bdff",
    },
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(5),
  right: theme.spacing(18),
  fontSize: "1rem",
  color: theme.palette.grey[500],
  [theme.breakpoints.down("sm")]: {
    right: 0,
    left: 0,
    bottom: 0,
    textAlign: "center",
    padding: theme.spacing(1),
  },
}));

const ResetPasswordPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <img
          src={TaskWiseLogo}
          alt="TaskWise Logo"
          style={{
            width: 300,
            maxWidth: "80%",
            height: "auto",
            paddingBottom: "1rem",
            display: "block",
            margin: "0 auto",
          }}
        />
        <img
          src={forgotpasswordlogo}
          alt="Forgot Password Logo"
          style={{
            width: 300,
            maxWidth: "80%",
            height: "auto",
            paddingBottom: "2rem",
            display: "block", // Make the image a block element
            margin: "0 auto", // Center it horizontally
          }}
        />
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Reset Password...
        </Typography>
        <Form>
          <StyledTextField
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <StyledTextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <SubmitButton variant="contained" color="primary" fullWidth>
            Update
          </SubmitButton>
        </Form>
      </Container>
      <CopyrightText>
        Copyright © 2024. TaskWise All rights reserved.
      </CopyrightText>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
