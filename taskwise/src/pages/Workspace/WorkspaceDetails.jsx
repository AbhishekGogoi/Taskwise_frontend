import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, InputBase, Divider, Tabs, Tab, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import WorkspaceTasks from './WorkspaceTasks';
import WorkspaceSettings from './WorkspaceSettings';
import WorkspaceProjectCard from './WorkspaceProjectCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkspaceByIdAsync, 
         fetchWorkspaceProjectsAsync,
         fetchWorkspaceTasksAsync,
         fetchWorkspaceMembersAsync } from '../../features/workspace/workspaceSlice';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f0f0f0",
  marginLeft: 0,
  width: '200px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  transition: theme.transitions.create('width'),
  '&:focus-within': {
    width: '300px',
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 160px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
}));

function WorkspaceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const workspace = useSelector((state) => state.workspace.workspaces.find((workspace) => workspace.id === id));

  const projectData = useSelector((state) => state.workspace.selectedProjects);
  const tasksData = useSelector((state) => state.workspace.selectedTasks);
  const membersData = useSelector((state) => state.workspace.selectedMembers);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkspaceByIdAsync(id));
      dispatch(fetchWorkspaceProjectsAsync(id));
      dispatch(fetchWorkspaceTasksAsync(id));
      dispatch(fetchWorkspaceMembersAsync(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (!workspace) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Workspace" 
                 style={{ borderRadius: '8px', width: '50px', height: "44px", padding: "12px" }} />
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ pt: 1, fontSize: '0.8rem' }}>
                  Workspace / <strong>Details</strong>
                </Typography>
                <Box>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                    {workspace.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2, p: 2 }}>
            <Search sx={{ mb: 1 }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'gray' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="workspace tabs">
            <Tab 
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Projects
                </Typography>
              }
            />
            <Tab 
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Tasks
                </Typography>
              }
            />
            <Tab 
              label={
                <Typography sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                  Settings
                </Typography>
              }
            />
          </Tabs>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<AddIcon />}
            sx={{ fontSize: '0.70rem', padding: '4px 8px', mr: 2 }}
          >
            New Project
          </Button>
        </Box>
      </Paper>
      <CustomBox>
        {selectedTab === 0 && <WorkspaceProjectCard projectData={projectData} membersData={membersData}/>}
        {selectedTab === 1 && <WorkspaceTasks tasksData={tasksData} membersData={membersData}/>}
        {selectedTab === 2 && <WorkspaceSettings />}
      </CustomBox>
    </Box>
  );
}

export default WorkspaceDetails;
