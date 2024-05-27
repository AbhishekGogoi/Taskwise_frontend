import React, { useState, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import { IconButton, Typography, Paper } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import { styled } from '@mui/material/styles';
import WorkspaceSettingsMembers from './WorkspaceSettingsMembers';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkspaceThumbnail from './WorkspaceThumbnail';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '400px',
  width: '94%',
  padding: theme.spacing(2),
  overflowY: 'auto',
  borderRadius: 2,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

function WorkspaceSettings({ workspace }) {
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1506744038136-46273834b3fb");
  const [workspaceText, setWorkspaceText] = useState("Workspaces A");
  const [isEditing, setIsEditing] = useState(false); // Track editing status
  const fileInputRef = useRef(null);
  const workspaceTextRef = useRef(null);

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

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing
    // Focus on the workspace text area and set cursor to the end
    workspaceTextRef.current.focus();
    const textLength = workspaceTextRef.current.innerText.length;
    window.getSelection().collapse(workspaceTextRef.current.firstChild, textLength);
  };

  const handleWorkspaceTextChange = (event) => {
    setWorkspaceText(event.target.innerText);
  };

  const handleWorkspaceTextBlur = () => {
    setIsEditing(false); // Disable editing on blur
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '20px' }}>
            <WorkspaceThumbnail
              selectedImage={selectedImage}
              handleFileUploadClick={handleFileUploadClick}
              width={150}
              height={150}
            />
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isEditing ? (
              <Typography
                variant="body1"
                component="div"
                sx={{ p: 2, fontWeight: 'bold' }}
                contentEditable
                onBlur={handleWorkspaceTextBlur}
                onInput={handleWorkspaceTextChange}
                ref={workspaceTextRef}
              >
                {workspaceText}
              </Typography>
            ) : (
              <>
                <Typography variant="body1" component="div" sx={{ p: 2, fontWeight: 'bold' }} ref={workspaceTextRef}>
                  {workspaceText}
                </Typography>
                <IconButton onClick={handleEditClick}>
                  <ModeEditSharpIcon sx={{color: "#000000", paddingBottom: 1}}/>
                </IconButton>
              </>
            )}
          </Box>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary">
              <PersonAddAltSharpIcon sx={{ color: "#000000", fontSize: 25 }} />
            </IconButton>
            <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
              Add Member
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary">
              <LinkSharpIcon sx={{ color: "#000000", fontSize: 25, transform: 'rotate(135deg)' }} />
            </IconButton>
            <Typography sx={{ paddingBottom: 0.2, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
              Invite to workspace via link
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkspaceSettingsMembers/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop:6 }}>
            <LogoutIcon sx={{fontSize: 30, color:"#000000"}}/>
            <Typography sx={{ paddingBottom: 0.2, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
              Exit Workspace
            </Typography>
          </Box>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

export default WorkspaceSettings;
