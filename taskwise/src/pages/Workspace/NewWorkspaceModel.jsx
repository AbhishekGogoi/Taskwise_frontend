import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Thumbnail from '../../components/Thumbnail';
import { useDispatch } from "react-redux";
import { createWorkspaceAsync } from "../../features/workspace/workspaceSlice";

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
  const dispatch = useDispatch();
  const [workspaceName, setWorkspaceName] = useState('');
  const [members, setMembers] = useState('');
  // eslint-disable-next-line
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setImageUrl("https://images.unsplash.com/photo-1506744038136-46273834b3fb"); // Adjust according to your API response
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCreateWorkspace = () => {
    const newWorkspace = {
      name: workspaceName,
      // members: members.split(',').map((member) => member.trim()),
      imgUrl: imageUrl,
      creatorUserID: "6654807dec9a0c3fa996f002",
    };
    dispatch(createWorkspaceAsync(newWorkspace));
    handleClose();
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
        <Thumbnail selectedImage={imageUrl || selectedImage} handleFileUploadClick={handleFileUploadClick} width={80} height={80} />
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      </Box>
      <TextField
        id="workspace-name"
        label="Workspace Name *"
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
      />
      <TextField
        id="workspace-add-members"
        label="Add Members"
        fullWidth
        margin="normal"
        style={{ marginBottom: '40px', backgroundColor: 'white' }}
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={handleCreateWorkspace}
      >
        Create Workspace
      </Button>
    </Box>
  );
};

NewWorkspaceModel.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NewWorkspaceModel;
