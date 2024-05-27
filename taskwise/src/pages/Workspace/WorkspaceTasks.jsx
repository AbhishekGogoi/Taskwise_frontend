import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WorkspaceMembers from './WorkspaceMembers';

function WorkspaceTasks({ workspace }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          <Box sx={{p:4}}>
            <Typography variant="h4">Workspace Tasks</Typography>
            <Typography variant="body1">Manage your workspace tasks here.</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <WorkspaceMembers />
      </Grid>
    </Grid>
  );
}

export default WorkspaceTasks;
