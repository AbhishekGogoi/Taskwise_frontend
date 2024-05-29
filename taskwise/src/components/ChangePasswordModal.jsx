import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px none #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const ChangePasswordModal = ({ handleClose, onUpdatePassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Perform password update logic here (e.g., validation, API call)
    onUpdatePassword(formData);
  };

  return (
    <Box sx={style}>
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      <TextField
        label="Enter current password"
        variant="outlined"
        type="password"
        name="currentPassword"
        fullWidth
        margin="normal"
        value={formData.currentPassword}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Enter new password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        name="newPassword"
        fullWidth
        margin="normal"
        value={formData.newPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Confirm new password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        fullWidth
        margin="normal"
        value={formData.confirmPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          backgroundColor: "#0b5fae",
          ":hover": { backgroundColor: "#0a54a0" },
        }}
        fullWidth
      >
        Update Password
      </Button>
    </Box>
  );
};

ChangePasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired, // Callback for password update
};

export default ChangePasswordModal;
