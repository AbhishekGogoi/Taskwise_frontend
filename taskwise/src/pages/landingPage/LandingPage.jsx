import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/Logo.png";
import board from "../../assets/board.png";

function LandingPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Taskwise Logo"
                style={{
                  width: isSmallScreen
                    ? "48px"
                    : isLargeScreen
                    ? "88px"
                    : "68px",
                  height: isSmallScreen
                    ? "45px"
                    : isLargeScreen
                    ? "85px"
                    : "65px",
                }}
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
      <Box sx={{ p: isSmallScreen ? 1 : isLargeScreen ? 2 : 2 }}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12} md={6} sx={{ px: isSmallScreen ? 0.5 : 1 }}>
            <Typography
              variant={isSmallScreen ? "h5" : isLargeScreen ? "h3" : "h4"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              AI Task management
            </Typography>
            <Typography
              variant={isSmallScreen ? "h5" : isLargeScreen ? "h3" : "h4"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              software loved by..
            </Typography>
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{ color: "#3f51b5", fontWeight: "bold" }}
            >
              Teams
            </Typography>
            <Box sx={{ pl: isSmallScreen ? 0 : 1 }}>
              <ul style={{ margin: 0, paddingLeft: isSmallScreen ? 16 : 16 }}>
                <li>Simple to use, powerful when you need it</li>
                <li>Manage multiple complex projects</li>
                <li>Scales into a full platform</li>
                <li>Generate your Tasks with TaskWise AI</li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ px: isSmallScreen ? 0.5 : 1 }}>
            <img
              src={board}
              alt="board"
              style={{
                width: "100%",
                maxWidth: isLargeScreen ? "800px" : "674px",
                height: "auto",
                marginTop: 0,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LandingPage;
