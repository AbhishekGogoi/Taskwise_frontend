import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box, Paper, Modal } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { styled } from '@mui/material/styles';
import AddMemberToWorkspaceModal from './Models/AddMemberToWorkspaceModal';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto',
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

function WorkspaceMembers({ height, width}) {
  const membersData = useSelector((state) => state.workspace.selectedMembers);
  const workspace = useSelector((state) => state.workspace.selectedWorkspace);

  const loggedInUser = useSelector((state) => state?.user?.loggedInUser);
  const loggedInUserEmail = loggedInUser?.user?.email;
  const loggedInMember = membersData.find(member => member.user.email === loggedInUserEmail);
  const isAdmin = loggedInMember?.role === 'Admin';

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const existingMemberEmails = membersData.map(member => member.user.email);
  console.log("existingMemberEmails: ", existingMemberEmails)

  const memberList = membersData.length === 0 ? (
    <Typography sx={{ textAlign: 'center', paddingTop: 2 }}>
      Please add members
    </Typography>
  ) : (
    <List>
      {membersData.map((member) => (
        <ListItem key={member.id}>
          <ListItemAvatar>
            <Avatar alt={member.user.name} src={member.user.imgUrl} />
          </ListItemAvatar>
          <ListItemText primary={member.user.email} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <StyledPaper sx={{ height: height, width: width }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
        <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, fontSize: 20, fontWeight: 'bold' }}>
          Members
        </Typography>
        {isAdmin && (
          <IconButton color="primary" onClick={handleOpen}>
            <PersonAddAltSharpIcon sx={{ color: "#000000" }} />
          </IconButton>
        )}
      </Box>
      {memberList}
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
    </StyledPaper>
  );
}

export default WorkspaceMembers;
