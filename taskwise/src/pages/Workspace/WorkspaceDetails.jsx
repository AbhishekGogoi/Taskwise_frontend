import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Grid, Divider, Tabs, Tab, Button } from '@mui/material';
import ProjectData from '../../data/project.json';
import wsImage from "../../assets/default-ws-thumbnail.jpg";
import AddIcon from '@mui/icons-material/Add';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import WorkspaceTasks from './WorkspaceTasks';
import WorkspaceSettings from './WorkspaceSettings';
import WorkspaceProjectCard from './WorkspaceProjectCard';

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

function WorkspaceDetails({ workspace }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
          height: 160,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={wsImage} alt="Workspace" style={{ padding: 8, height: '50px', marginRight: '10px', fontSize: 2 }} />
            <Box>
              <Typography variant="body1" component="div">
                Workspace <strong> / Details</strong>
              </Typography>
              <Typography variant="body2" component="div" sx={{ paddingTop: 0.5, fontSize: 18 }}>
                Workspace A
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pr: 2 }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="workspace tabs">
            <Tab label="Projects" sx={{ textTransform: 'none' }} />
            <Tab label="Tasks" sx={{ textTransform: 'none' }} />
            <Tab label="Settings" sx={{ textTransform: 'none' }} />
          </Tabs>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
                variant="contained" 
                size="small" 
                startIcon={<SmartToyOutlinedIcon sx={{padding: 0.4}}/>}
                sx={{ fontSize: '1rem', padding: '4px 8px', textTransform: 'none' }}>Create with AI</Button>
            <Button 
                variant="contained" 
                size="small" 
                startIcon={<AddIcon sx={{padding: 0.2}}/>}
                sx={{ fontSize: '1rem', padding: '4px 8px', textTransform: 'none' }}>New Project</Button>
          </Box>
        </Box>
      </Paper>
      <CustomBox>
        {selectedTab === 0 && (
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {ProjectData.map((project) => (
                  <Grid item key={project.id} xs={12} sm={6} md={4} lg={4} xl={3}>
                    <WorkspaceProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', width: 200, bgcolor: 'white' }}>
                <Typography variant="h6">Members</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && <WorkspaceTasks workspace={workspace} />}
        {selectedTab === 2 && <WorkspaceSettings workspace={workspace} />}
      </CustomBox>
    </Box>
  );
}

export default WorkspaceDetails;
