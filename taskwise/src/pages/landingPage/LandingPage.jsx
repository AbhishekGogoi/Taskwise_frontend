import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../assets/Logo.png";

function LandingPage() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Taskwise Logo"
                style={{ width: "68px", height: "65px" }}
              />
            </Box>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
                textTransform: "none",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#e0e0e0",
                },
              }}
            >
              Log In
            </Button>
            <Button
              sx={{
                color: "#ffffff",
                backgroundColor: "#4285F4",
                borderRadius: "20px",
                textTransform: "none",
                padding: "6px 16px",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default LandingPage;
