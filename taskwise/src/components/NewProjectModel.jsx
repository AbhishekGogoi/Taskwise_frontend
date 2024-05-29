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
import { useDispatch, useSelector } from "react-redux";
import { addProjectAsync } from "../features/project/projectSlice";

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
  const dispatch=useDispatch();
  const creatorUserID=useSelector((state)=>state?.user?.loggedInUser?.user?._id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [workspace, setWorkspace] = useState("Updated Workspace");
  const fileInputRef = useRef(null);
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [errors, setErrors] = useState({});
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };
  const validateForm =()=>{
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Project Name is required';
    }
    if (!workspace) {
      newErrors.workspace = 'Assign Workspace is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleCreate=()=>{
    if(validateForm()){
      const projectdata={
        "name":name,
        "description":description,
        "workspaceName":workspace,
        "creatorUserID":creatorUserID
      }
      dispatch(addProjectAsync(projectdata))
      handleClose()
    }
    
  }
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
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, workspace: null }));
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    }
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
        value={name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        id="project-description"
        label="Project Description"
        fullWidth
        margin="normal"
        style={{ marginBottom: "20px", backgroundColor: "white" }}
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />
      <FormControl fullWidth margin="normal" style={{ marginBottom: "40px" }} error={!!errors.workspace}>
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
          <MenuItem value="Updated Workspace">Workspace 1</MenuItem>
          <MenuItem value="Updated Workspace">Workspace 2</MenuItem>
          <MenuItem value="Updated Workspace">Workspace 3</MenuItem>
        </Select>
        {!!errors.workspace && <Typography color="error">{errors.workspace}</Typography>}
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: "none" }}
        onClick={handleCreate}
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
