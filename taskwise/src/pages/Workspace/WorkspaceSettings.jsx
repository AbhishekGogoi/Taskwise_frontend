import React, { useState, useRef } from 'react';
import { Box, Grid, IconButton, Typography, Paper, TextField, Dialog, DialogContent, DialogTitle, Tabs, Tab } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import { styled } from '@mui/material/styles';
import WorkspaceSettingsMembers from './WorkspaceSettingsMembers';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkspaceThumbnail from './WorkspaceThumbnail';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import { ImageList, ImageListItem } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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

const TabLabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

function WorkspaceSettings({ workspace }) {
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1506744038136-46273834b3fb");
  const [workspaceText, setWorkspaceText] = useState("Workspace A");
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogTab, setDialogTab] = useState(0);
  const [mediaImages, setMediaImages] = useState([
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg',
  ]);

  // const [links, setLinks] = useState([
  //   'https://example.com/link1',
  //   'https://example.com/link2',
  //   'https://example.com/link3',
  // ]);
 const links = [
    'https://example.com/link1',
    'https://example.com/link2',
    'https://example.com/link3',
  ];
  // const [docs, setDocs] = useState([
  //   'https://example.com/doc1.pdf',
  //   'https://example.com/doc2.pdf',
  //   'https://example.com/doc3.pdf',
  // ]);
  const docs= [
    'https://example.com/doc1.pdf',
    'https://example.com/doc2.pdf',
    'https://example.com/doc3.pdf',
  ];

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
        setMediaImages([...mediaImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleWorkspaceTextChange = (event) => {
    setWorkspaceText(event.target.value);
  };

  const handleDialogOpen = (title) => {
    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setDialogTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  variant="outlined"
                  value={workspaceText}
                  onChange={handleWorkspaceTextChange}
                  autoFocus
                  sx={{ flexGrow: 1 }}
                />
                <IconButton onClick={handleSaveClick} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick} color="secondary">
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <Typography variant="body1" component="div" sx={{ p: 2, fontWeight: 'bold' }}>
                  {workspaceText}
                </Typography>
                <IconButton onClick={handleEditClick}>
                  <ModeEditSharpIcon sx={{ color: "#000000" }} />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>
              Media, Links and Docs
            </Typography>
            <IconButton
              color="primary"
              onClick={() => handleDialogOpen()}
              disabled={mediaImages.length === 0 && links.length === 0 && docs.length === 0}
            >
              <ChevronRightSharpIcon sx={{ color: "#000000", fontSize: 25 }} />
            </IconButton>
          </Box>
          {(mediaImages.length <= 0 && docs.length <= 0 && links.length <= 0) && (
            <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No data available</Typography>
          )}
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
            <WorkspaceSettingsMembers />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
            <LogoutIcon sx={{ fontSize: 30, color: "#000000" }} />
            <Typography sx={{ paddingBottom: 0.2, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
              Exit Workspace
            </Typography>
          </Box>
        </StyledPaper>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth sx={{height: "400px"}}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
              <Tabs value={dialogTab} onChange={handleTabChange} variant="fullWidth">
                <Tab
                  label={
                    <TabLabelWrapper>
                      <ImageOutlinedIcon  sx={{p: 1}} />
                      <span>Media</span>
                    </TabLabelWrapper>
                  }
                />
                <Tab
                  label={
                    <TabLabelWrapper>
                      <LinkOutlinedIcon  sx={{p: 1}} />
                      <span>Links</span>
                    </TabLabelWrapper>
                  }
                />
                <Tab
                  label={
                    <TabLabelWrapper>
                      <DescriptionOutlinedIcon  sx={{p: 1}} />
                      <span>Docs</span>
                    </TabLabelWrapper>
                  }
                />
              </Tabs>
            </Grid>
            <Grid item xs={12}>
              {dialogTab === 0 && (
                mediaImages.length > 0 ? (
                  <ImageList cols={3} rowHeight={200}>
                    {mediaImages.map((image, index) => (
                      <ImageListItem key={index}>
                        <img src={image} alt={`Media ${index + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No media available</Typography>
                )
              )}
              {dialogTab === 1 && (
                links.length > 0 ? (
                  <Box sx={{ p: 2 }}>
                    {links.map((link, index) => (
                      <Typography key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No links available</Typography>
                )
              )}
              {dialogTab === 2 && (
                docs.length > 0 ? (
                  <Box sx={{ p: 2 }}>
                    {docs.map((doc, index) => (
                      <Typography key={index}>
                        <a href={doc} target="_blank" rel="noopener noreferrer">{doc}</a>
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No documents available</Typography>
                )
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </Grid>
  );
}

export default WorkspaceSettings;
