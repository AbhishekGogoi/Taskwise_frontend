import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box, Paper } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { styled } from '@mui/material/styles';
import MemberData from '../../data/members.json';

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

function WorkspaceMembers({height, width}) {
  const memberList = MemberData.length === 0 ? (
    <Typography sx={{ textAlign: 'center', paddingTop: 2 }}>
      Please add members
    </Typography>
  ) : (
    <List>
      {MemberData.map((member) => (
        <ListItem key={member.id}>
          <ListItemAvatar>
            <Avatar alt={member.name} src={member.img} />
          </ListItemAvatar>
          <ListItemText primary={member.name} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <StyledPaper sx={{height: height, width: width}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
        <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, fontSize: 20, fontWeight: 'bold' }}>
          Members
        </Typography>
        <IconButton color="primary">
          <PersonAddAltSharpIcon sx={{ color: "#000000" }} />
        </IconButton>
      </Box>
      {memberList}
    </StyledPaper>
  );
}

export default WorkspaceMembers;
