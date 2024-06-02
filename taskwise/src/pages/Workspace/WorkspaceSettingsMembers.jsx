import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '200px', // Adjust as needed
  width: '150%',
  padding: theme.spacing(1),
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

function WorkspaceSettingsMembers({membersData}) {
  // Sort members by role, prioritizing admins
  const sortedMembers = [...membersData].sort((a, b) => {
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    return 0;
  });

  const memberCount = sortedMembers.length;
  const memberList = memberCount === 0 ? (
    <Typography sx={{ textAlign: 'center', paddingTop: 2 }}>
      Please add members
    </Typography>
  ) : (
    <List sx={{ width: '100%' }}>
      {sortedMembers.map((member) => (
        <ListItem key={member.id} sx={{ justifyContent: 'space-evenly'}}>
          <ListItemAvatar>
            <Avatar alt={member.user.email} src={member.user.imgUrl} sx={{ fontWeight: 10 }} />
          </ListItemAvatar>
          <ListItemText
            primary={member.user.email}
            sx={{ fontSize: 12, display: 'flex', justifyContent: 'space-between' }}
          />
          {member.role !== 'Member' && (
            <ListItemText
              primary={member.role}
              sx={{ fontSize: 12, display: 'flex', justifyContent: 'end' }}
            />
          )}
        </ListItem>
      ))}
    </List>
  );

  return (
    <StyledPaper sx={{marginTop:2}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
        <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, fontSize: 15, fontWeight: 'bold' }}>
          Members ({memberCount})
        </Typography>
      </Box>
      {memberList}
    </StyledPaper>
  );
}

export default WorkspaceSettingsMembers;
