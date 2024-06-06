import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import AddedMembersModal from './AddedMembersModal';
import { addMemberAsync, fetchWorkspaceMembersAsync } from '../../../features/workspace/workspaceSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddMemberToWorkspaceModal = ({ handleClose, workspaceId }) => {
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [membersError, setMembersError] = useState('');
  const [openAddedMembersModal, setOpenAddedMembersModal] = useState(false);
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const adminUserId = useSelector((state) => state?.user?.loggedInUser?.user?._id);

  const handleAddMember = (event) => {
    if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
      event.preventDefault();
      const email = inputValue.trim();
      if (email && emailRegex.test(email) && !members.includes(email)) {
        setMembers([...members, email]);
        setInputValue('');
        setMembersError('');
      } else if (!emailRegex.test(email)) {
        setMembersError('Invalid email address.');
      }
    }
  };

  const handleDeleteMember = (emailToDelete) => () => {
    setMembers((prevMembers) => prevMembers.filter((email) => email !== emailToDelete));
  };

  const handleAddButtonClick = async () => {
    try {
      // Dispatch the addMemberAsync action creator
      await dispatch(addMemberAsync({ workspaceId, adminUserId, memberEmails: members }));
      // Fetch updated members list
      await dispatch(fetchWorkspaceMembersAsync(workspaceId));
      setOpenAddedMembersModal(true);
      handleClose();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleAddedMembersModalClose = () => {
    setOpenAddedMembersModal(false);
  };

  return (
    <>
      <Modal open onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography id="workspace-title" variant="h5" component="h2" style={{ fontWeight: 550 , fontSize: 20}}>
              Add people to my workspace
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            id="workspace-add-members"
            label="Add Members (press Enter to add)"
            fullWidth
            margin="normal"
            style={{ marginBottom: '20px', backgroundColor: 'white' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddMember}
            error={!!membersError}
            helperText={membersError}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: '20px' }}>
            {members.map((email, index) => (
              <Chip key={index} label={email} onDelete={handleDeleteMember(email)} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: 'none', backgroundColor: '#f0f0f0' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
              onClick={handleAddButtonClick}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <AddedMembersModal
        open={openAddedMembersModal}
        handleClose={handleAddedMembersModalClose}
        members={members}
      />
    </>
  );
};

AddMemberToWorkspaceModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddMemberToWorkspaceModal;
