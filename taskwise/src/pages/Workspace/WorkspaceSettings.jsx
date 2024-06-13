import React, { useState, useRef } from 'react';
import {
  Box, Grid, IconButton, Typography, Paper, TextField, Dialog, DialogContent, DialogTitle, Tabs, Tab, Card, CardContent, CardActions, Modal,
  CardMedia
} from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import { styled } from '@mui/material/styles';
import WorkspaceSettingsMembers from './WorkspaceSettingsMembers';
import LogoutIcon from '@mui/icons-material/Logout';
import Thumbnail from '../../components/Thumbnail';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExitWorkspaceModal from './Models/ExitWorkspaceModal';
import AddMemberToWorkspaceModal from './Models/AddMemberToWorkspaceModal';
import ShareJoiningLinkModel from './Models/ShareJoiningLinkModel';
import { updateWorkspaceAsync, uploadFileAsync, fetchWorkspaceMediaAndDocsAsync } from '../../features/workspace/workspaceSlice';
import { useDispatch, useSelector } from 'react-redux';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '400px',
  width: '94%',
  padding: theme.spacing(2),
  borderRadius: 2,
}));

const TabLabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

function WorkspaceSettings({ workspace, membersData }) {
  const mediaAndDocs = useSelector((state) => state.workspace.selectedMediaAndDocs);
  const [selectedImage, setSelectedImage] = useState(workspace.imgUrl);
  const [workspaceText, setWorkspaceText] = useState(workspace.name);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogTab, setDialogTab] = useState(0);
  const [mediaImages, setMediaImages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openShareModel, setOpenShareModel] = useState(false);
  const [openExitModal, setOpenExitModal] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  // }, [dispatch, workspace.id, mediaAndDocs.imgUrls, mediaAndDocs.docUrls]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenShareModel = () => setOpenShareModel(true);
  const handleCloseShareModel = () => setOpenShareModel(false);
  const handleOpenExitModal = () => setOpenExitModal(true);
  const handleCloseExitModal = () => setOpenExitModal(false);

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
        const { presignedUrl } = response.payload;
        const updatedWorkspace = { ...workspace, imgUrl: presignedUrl };
        dispatch(updateWorkspaceAsync({ id: workspace.id, updatedWorkspace }));
        setSelectedImage(presignedUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedWorkspace = { ...workspace, name: workspaceText };
    dispatch(updateWorkspaceAsync({ id: workspace.id, updatedWorkspace }));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleWorkspaceTextChange = (event) => {
    setWorkspaceText(event.target.value);
  };

  const handleDialogOpen = (title) => {
    dispatch(fetchWorkspaceMediaAndDocsAsync({ workspaceId: workspace.id }));
    setMediaImages(mediaAndDocs.imgUrls || []);
    setDocs(mediaAndDocs.docUrls || []);
    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setDialogTab(newValue);
  };

  const handleRemoveDoc = (index) => {
    const updatedDocs = docs.filter((_, docIndex) => docIndex !== index);
    setDocs(updatedDocs);
  };
  const loggedInUser = useSelector((state) => state?.user?.loggedInUser);
  const loggedInUserEmail = loggedInUser?.user?.email;

  const loggedInMember = membersData.find(member => member.user.email === loggedInUserEmail);
  const isAdmin = loggedInMember?.role === 'Admin';

  // Extract existing member emails
  const existingMemberEmails = membersData.map(member => member.user.email);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Thumbnail
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
              Media and Docs
            </Typography>
            <IconButton
              color="primary"
              onClick={() => handleDialogOpen()}
              // disabled={mediaImages.length === 0 && docs.length === 0}
            >
              <ChevronRightSharpIcon sx={{ color: "#000000", fontSize: 25 }} />
            </IconButton>
          </Box>
          {/* {(mediaImages.length <= 0 && docs.length <= 0) && (
            <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No data available</Typography>
          )} */}
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledPaper>
        {isAdmin && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" onClick={handleOpen}>
                  <PersonAddAltSharpIcon sx={{ color: "#000000" }} />
                </IconButton>
                <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
                  Add Member
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpenShareModel}>
                  <LinkSharpIcon sx={{ color: "#000000", fontSize: 25, transform: 'rotate(135deg)' }} />
                </IconButton>
                <Typography sx={{ paddingBottom: 0.2, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
                  Invite to workspace via link
                </Typography>
              </Box>
            </>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkspaceSettingsMembers membersData={membersData} workspaceId={workspace.id} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
            <IconButton onClick={handleOpenExitModal}>
              <LogoutIcon sx={{ fontSize: 30, color: "#000000" }} />
            </IconButton>
            <Typography sx={{ paddingBottom: 0.2, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
              Exit Workspace
            </Typography>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-member-modal-title"
            aria-describedby="add-member-modal-description"
          >
            <Box>
              <AddMemberToWorkspaceModal handleClose={handleClose} workspaceId={workspace.id} existingMemberEmails={existingMemberEmails} />
            </Box>
          </Modal>
          <Modal
            open={openShareModel}
            onClose={handleCloseShareModel}
            aria-labelledby="add-member-modal-title"
            aria-describedby="add-member-modal-description"
          >
            <Box>
              <ShareJoiningLinkModel handleClose={handleCloseShareModel} />
            </Box>
          </Modal>
          <Modal
            open={openExitModal}
            onClose={handleCloseExitModal}
            aria-labelledby="exit-workspace-modal-title"
            aria-describedby="exit-workspace-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: '400px',
              }}
            >
              <ExitWorkspaceModal handleClose={handleCloseExitModal} workspaceId={workspace.id} />
            </Box>
          </Modal>
        </StyledPaper>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Tabs value={dialogTab} onChange={handleTabChange} variant="fullWidth">
                {mediaImages.length > 0 && (
                  <Tab
                    label={
                      <TabLabelWrapper>
                        <ImageOutlinedIcon sx={{ p: 1 }} />
                        <span>Media</span>
                      </TabLabelWrapper>
                    }
                  />
                )}
                {docs.length > 0 && (
                  <Tab
                    label={
                      <TabLabelWrapper>
                        <DescriptionOutlinedIcon sx={{ p: 1 }} />
                        <span>Docs</span>
                      </TabLabelWrapper>
                    }
                  />
                )}
              </Tabs>
            </Grid>
            <Grid item xs={12} style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {dialogTab === 0 && (
                mediaImages.length > 0 ? (
                  <Grid container spacing={1}>
                    {mediaImages.map((image, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ height: '100%' }}>
                          <CardMedia
                            component="img"
                            src={image.imgUrl}
                            alt={`Media ${index + 1}`}
                            height="100"
                            sx={{ objectFit: 'cover' }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography sx={{ p: 2, textAlign: 'left', color: '#888' }}>No media available</Typography>
                )
              )}
              {dialogTab === 1 && (
                docs.length > 0 ? (
                  <Box sx={{ p: 2 }}>
                    {docs.map((doc, index) => (
                      <Card key={index} sx={{ mb: 1 }}>
                        <CardContent>
                          <Typography>
                            <a href={doc.docUrl} target="_blank" rel="noopener noreferrer">{doc.docName}</a>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleRemoveDoc(index)}>
                            <CloseIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
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
