import React from 'react';
import { Grid, Paper } from '@mui/material';
import WorkspaceMembers from './WorkspaceMembers';
import WorkspaceTaskPage from './WorkspaceTaskPage';

function WorkspaceTasks({ tasksData, membersData }) {
  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} md={9} sx={{ height: '100%' }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <WorkspaceTaskPage tasksData={tasksData}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} sx={{ height: '100%' }}>
        <Paper elevation={3} sx={{ height: '97%' }}>
          <WorkspaceMembers height="95%" width="90%" membersData={membersData}/>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WorkspaceTasks;
