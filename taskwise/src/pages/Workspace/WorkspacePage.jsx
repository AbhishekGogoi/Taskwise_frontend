import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import WorkspaceCard from './WorkspaceCard';
//import WorkspaceData from '../../data/workspaces.json';
import AddIcon from '@mui/icons-material/Add';
import NewWorkspaceModel from './NewWorkspaceModel';
import Modal from '@mui/material/Modal';
import { useDispatch,useSelector } from "react-redux";
import { fetchWorkspaceAsync } from '../../features/workspace/workspaceSlice';

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

function WorkspacePage() {
  const [openModal, setOpenModal] = useState(false);

  const handleNewWorkspaceClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //redux
 const dispatch=useDispatch();
 const WorkspaceData=useSelector((state)=>state.workspace.workspaces)
 useEffect(()=>{
    dispatch(fetchWorkspaceAsync())
 },[dispatch])

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
          height: 100,
        }}
      >

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" component="div" sx={{ p: 2, fontWeight: 'bold' }}>
            Workspaces
          </Typography>
          <Stack spacing={2} direction="row" sx={{ pr: 2}}>
            <Button 
              variant="contained" 
              size="small" 
              startIcon={<AddIcon />}
              onClick={handleNewWorkspaceClick}
              sx={{ fontSize: '0.70rem', padding: '4px 8px' }}>New Workspace</Button>
          </Stack>
        </Box>
        <Box sx={{ width: '300px', height: '30px', paddingLeft: "15px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "gray" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
      </Paper>
      <CustomBox>
        <Grid container spacing={3} alignItems="center">
          {WorkspaceData.map((workspace) => (
            <Grid item key={workspace.id} xs={6} sm={6} md={3} lg={3} xl={2}>
              <WorkspaceCard workspace={workspace} />
            </Grid>
          ))}
        </Grid>
      </CustomBox>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="workspace-model-title"
        aria-describedby="workspace-model-description"
      >
      <NewWorkspaceModel handleClose={handleCloseModal} />
      </Modal>
    </Box>
  );
}

export default WorkspacePage;
