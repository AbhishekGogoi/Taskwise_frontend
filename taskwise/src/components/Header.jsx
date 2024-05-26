import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoImage from "../assets/TaskWiseLogo.png";
import ProfileImage from "../assets/sample-pi.png";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const settings = ["Settings", "Logout"];

function Header({ isSmallScreen, toggleDrawer }) {
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
                {isSmallScreen && (
                    <IconButton
                        edge="start"
                        color="blue"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ ml:2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        pr: { xs: 1, md: 3, lg: 4, xl: 5 },
                    }}
                >
                    <Tooltip title="Notifications">
                        <IconButton sx={{ p: 1, mr: { xs: 1, md: 3, lg: 4, xl: 5 } }}>
                            <NotificationsIcon
                                sx={{
                                    fontSize: { xs: 15, md: 20, lg: 25, xl: 30 },
                                    color: "black",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                            <Avatar
                                alt="Profile Image"
                                src={ProfileImage}
                                sx={{
                                    width: { xs: 15, md: 20, lg: 25, xl: 30 },
                                    height: { xs: 15, md: 20, lg: 25, xl: 30 },
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
            </Toolbar>
        </AppBar>
    );
}

export default Header;
