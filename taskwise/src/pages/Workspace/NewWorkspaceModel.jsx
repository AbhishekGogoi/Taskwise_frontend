import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px none #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const NewWorkspaceModel = ({ handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // A ref is used to trigger the file input dialog programmatically.
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handles the file input change event, manage the selected file.
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

  return (
    <Box sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography id="workspace-title" variant="h5" component="h2" style={{ fontWeight: 550 }}>
          New Workspace
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography id="workspace-thumbnail" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        Thumbnail <StarIcon style={{ color: 'gray', marginLeft: '2px', fontSize: 'xx-small' }} />
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '20px' }}>
        <Box
          sx={{
            borderRadius: '8px',
            border: '1px none gray',
            width: 80,
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: selectedImage ? 'transparent' : '#EDEDED'
          }}
          onClick={handleFileUploadClick}
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <AddCircleOutlineIcon fontSize="large" sx={{ color: 'gray', fontSize: 30 }} />
          )}
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
      <TextField id="workspace-name" label="Workspace Name *" fullWidth margin="normal" style={{ marginBottom: '20px', backgroundColor: 'white' }} />
      <TextField id="workspace-add-members" label="Add Members" fullWidth margin="normal" style={{ marginBottom: '40px', backgroundColor: 'white' }} />
      <Button variant="contained" color="primary" fullWidth sx={{ textTransform: 'none' }} onClick={handleClose}>
        Create Workspace
      </Button>
    </Box>
  );
};

// Prop types and state management
NewWorkspaceModel.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NewWorkspaceModel
