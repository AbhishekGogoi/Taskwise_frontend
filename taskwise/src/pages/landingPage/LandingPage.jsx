import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AdbIcon from '@mui/icons-material/AdbIcon';
function LandingPage() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        </Box>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Sign Up</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default LandingPage