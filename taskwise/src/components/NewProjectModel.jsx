import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import ProjectThumbnail from "../pages/Project/ProjectThumbnail"; // Import the ThumbnailComponent

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px none #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const NewProjectModel = ({ handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [workspace, setWorkspace] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkspaceChange = (event) => {
    setWorkspace(event.target.value);
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          id="project-title"
          variant="h5"
          component="h2"
          style={{ fontWeight: 550 }}
        >
          New Project
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography
        id="project-thumbnail"
        style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
      >
        Thumbnail{" "}
        <StarIcon
          style={{ color: "gray", marginLeft: "2px", fontSize: "xx-small" }}
        />
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onClick={handleFileUploadClick}
      >
        <ProjectThumbnail
          selectedImage={selectedImage}
          handleFileUploadClick={handleFileUploadClick}
          width={80}
          height={80}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
      <TextField
        id="project-name"
        label="Project Name *"
        fullWidth
        margin="normal"
        style={{ marginBottom: "20px", backgroundColor: "white" }}
      />
      <TextField
        id="project-description"
        label="Project Description"
        fullWidth
        margin="normal"
        style={{ marginBottom: "20px", backgroundColor: "white" }}
      />
      <FormControl fullWidth margin="normal" style={{ marginBottom: "40px" }}>
        <InputLabel id="assign-workspace-label">Assign Workspace</InputLabel>
        <Select
          labelId="assign-workspace-label"
          id="assign-workspace"
          value={workspace}
          label="Assign Workspace"
          onChange={handleWorkspaceChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="workspace1">Workspace 1</MenuItem>
          <MenuItem value="workspace2">Workspace 2</MenuItem>
          <MenuItem value="workspace3">Workspace 3</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: "none" }}
        onClick={handleClose}
      >
        Create Project
      </Button>
    </Box>
  );
};

NewProjectModel.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NewProjectModel;
