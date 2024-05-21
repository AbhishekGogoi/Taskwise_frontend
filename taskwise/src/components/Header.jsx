import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoImage from "../assets/TaskWiseLogo.png";
import ProfileImage from "../assets/sample-pi.png";

const settings = ["Settings", "Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              height: { xs: 40, md: 50, lg: 60, xl: 70 },
            }}
            alt="Logo"
            src={LogoImage}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: {
                xs: "1.25rem",
                md: "1.5rem",
                lg: "1.75rem",
                xl: "2rem",
              },
            }}
          >
            TaskWise
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <Tooltip title="Notifications">
              <IconButton sx={{ p: 1, mr: { xs: 1, md: 3, lg: 4, xl: 5 } }}>
                <NotificationsIcon
                  sx={{
                    fontSize: { xs: 25, md: 30, lg: 35, xl: 40 },
                    color: "black",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ pr: 5 }}>
                <Avatar
                  alt="Profile Image"
                  src={ProfileImage}
                  sx={{
                    width: { xs: 30, md: 40, lg: 50, xl: 60 },
                    height: { xs: 30, md: 40, lg: 50, xl: 60 },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
