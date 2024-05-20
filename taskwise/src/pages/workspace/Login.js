// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your authentication logic here
    navigate('/workspace');
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 3 }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
