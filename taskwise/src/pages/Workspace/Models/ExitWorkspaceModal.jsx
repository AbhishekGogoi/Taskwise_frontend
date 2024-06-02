import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const ExitWorkspaceModal = ({ handleClose }) => {
  return (
     <>
      <Modal open onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography style={{ fontWeight: 550 , fontSize: 20}}>
              Are you sure you want to exit from this workspace?
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography style={{ fontSize: 15, textAlign: "center"}}>
            The projects in this workspace will no longer be accessible once you exit the workspace.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: 100, textTransform: 'none', backgroundColor: '#f0f0f0', borderRadius: 2 }}
              onClick={handleClose}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 100, textTransform: 'none', borderRadius: 2 }}
              onClick={() => {
                // Handle exit logic here
                handleClose();
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

ExitWorkspaceModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ExitWorkspaceModal;
