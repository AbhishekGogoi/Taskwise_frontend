// AddedMembersModal.js
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

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

const AddedMembersModal = ({ open, handleClose, members }) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="added-members-title">
    <Box sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography id="added-members-title" variant="h5" component="h2" style={{ fontWeight: 550 }}>
          Added People to Workspace
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" style={{ marginBottom: '20px' }}>
        You have added {members.length} people to the workspace
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {members.map((email, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar>{email[0].toUpperCase()}</Avatar>
            <Typography>{email}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Modal>
);

AddedMembersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddedMembersModal;
