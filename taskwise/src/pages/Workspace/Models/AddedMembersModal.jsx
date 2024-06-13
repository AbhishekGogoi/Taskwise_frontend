import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const AddedMembersModal = ({ open, handleClose, members, responseData }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Members Added
        </Typography>
        <Typography variant="body1" gutterBottom>
          The following members have been added:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {members.map((member, index) => (
            <Typography key={index} variant="body2">
              {member}
            </Typography>
          ))}
        </Box>
        <Typography variant="body1" gutterBottom>
          API Response:
        </Typography>
        <Typography variant="body2" gutterBottom>
          {JSON.stringify(responseData, null, 2)}
        </Typography>
      </Box>
    </Modal>
  );
};

AddedMembersModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  responseData: PropTypes.object.isRequired,
};

export default AddedMembersModal;
