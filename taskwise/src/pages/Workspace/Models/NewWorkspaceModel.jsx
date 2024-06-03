import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import Thumbnail from '../../../components/Thumbnail';
import { useDispatch, useSelector } from "react-redux";
import { createWorkspaceAsync, uploadFileAsync } from "../../../features/workspace/workspaceSlice";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultImage = 'https://taskwiseai-s3.s3.ap-south-1.amazonaws.com/1717225670701-sample-one.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAW3MEDJLIRCUPEROY%2F20240601%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240601T070750Z&X-Amz-Expires=3600&X-Amz-Signature=ea21669e6ae66f6d912079548d409b76215448ba616de7135999478f47a2e099&X-Amz-SignedHeaders=host';

const NewWorkspaceModel = ({ handleClose, onWorkspaceCreated }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.user?.loggedInUser?.user?._id);

  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [nameError, setNameError] = useState('');
  const [membersError, setMembersError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await dispatch(uploadFileAsync(formData));
        setImageUrl(response.payload.presignedUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      setNameError('Workspace name is required.');
      return;
    }
  
    let finalImageUrl = imageUrl; // Initially set to uploaded image URL
  
    // If imageUrl is empty, assign default image URL
    if (!imageUrl) {
      console.warn('No image uploaded. Using default image.');
      finalImageUrl = defaultImage;
    }
  
    const newWorkspace = {
      name: workspaceName,
      description,
      imgUrl: finalImageUrl,
      creatorUserID: userId,
      memberEmails: members,
    };
  
    console.log(newWorkspace);
    await dispatch(createWorkspaceAsync(newWorkspace));
    onWorkspaceCreated(); // Notify the parent component about the new workspace
    handleClose();
  }; 

  const handleAddMember = (event) => {
    if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
      event.preventDefault();
      const email = inputValue.trim();
      if (email && emailRegex.test(email) && !members.includes(email)) {
        setMembers([...members, email]);
        setInputValue('');
        setMembersError('');
      } else if (!emailRegex.test(email)) {
        setMembersError('Invalid email address.');
      }
    }
  };

  const handleDeleteMember = (emailToDelete) => () => {
    setMembers((members) => members.filter((email) => email !== emailToDelete));
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
        Thumbnail
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '20px' }}>
        <Thumbnail selectedImage={defaultImage} handleFileUploadClick={handleFileUploadClick} width={80} height={80} />
        <IconButton onClick={handleFileUploadClick}>
          <ModeEditSharpIcon sx={{ color: "#000000" }} />
        </IconButton>
      </Box>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <TextField
        id="workspace-name"
        label="Workspace Name *"
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        value={workspaceName}
        onChange={(e) => {
          setWorkspaceName(e.target.value);
          if (e.target.value.trim()) {
            setNameError('');
          }
        }}
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        id="workspace-description"
        label="Workspace Description"
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="workspace-add-members"
        label="Add Members (press Enter to add)"
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px', backgroundColor: 'white' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddMember}
        error={!!membersError}
        helperText={membersError}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: '20px' }}>
        {members.map((email) => (
          <Chip
            key={email}
            label={email}
            onDelete={handleDeleteMember(email)}
          />
        ))}
      </Box>
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
  onWorkspaceCreated: PropTypes.func.isRequired,
};

export default NewWorkspaceModel;