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
import AddIcon from '@mui/icons-material/Add';
import NewWorkspaceModel from './Models/NewWorkspaceModel';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspaceByUserIDAsync } from '../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router-dom';

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
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'thin',
  'scrollbar-color': '#888 #e0e0e0',
}));

// Styled message for no workspaces
const NoWorkspacesMessage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  fontSize: "1.5rem",
  color: theme.palette.text.secondary,
}));

function WorkspacePage() {
  const [openModal, setOpenModal] = useState(false);
  const handleNewWorkspaceClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const WorkspaceData = useSelector((state) => state.workspace.workspaces);
  const userId = useSelector((state) => state?.user?.loggedInUser?.user?._id);

  useEffect(() => {
    dispatch(fetchWorkspaceByUserIDAsync(userId));
  }, [dispatch, userId]);

  const handleWorkspaceCreated = () => {
    dispatch(fetchWorkspaceByUserIDAsync(userId));
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
        {WorkspaceData.length > 0 ? (
          <Grid container spacing={3} alignItems="center">
            {WorkspaceData.map((workspace) => (
              <Grid item key={workspace.id} xs={6} sm={6} md={3} lg={3} xl={2}>
                <WorkspaceCard workspace={workspace} onClick={() => navigate(`/workspaces/${workspace.id}`)} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoWorkspacesMessage>Start by adding a new workspace.</NoWorkspacesMessage>
        )}
      </CustomBox>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="workspace-model-title"
        aria-describedby="workspace-model-description"
      >
        <NewWorkspaceModel handleClose={handleCloseModal} onWorkspaceCreated={handleWorkspaceCreated} />
      </Modal>
    </Box>
  );
}

export default WorkspacePage;
