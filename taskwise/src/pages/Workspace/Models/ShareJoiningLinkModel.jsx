import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, IconButton, Modal, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';

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

const ShareJoiningLinkModel = ({ handleClose }) => {
  const handleCopy = () => {
    // Logic to copy the link
  };

  return (
    <>
      <Modal open onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography style={{ fontWeight: 550 , fontSize: 20, textAlign: "center"}}>
              Share Joining Link
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography style={{ fontSize: 15 }}>
            Share this link via
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <FacebookIcon sx={{ p: 1, color: '#3b5998', fontSize: 40 }} />
            <WhatsAppIcon sx={{ p: 1, color: '#25D366', fontSize: 40 }} />
            <TelegramIcon sx={{ p: 1, color: '#0088cc', fontSize: 40 }} />
          </Box>
          <Divider style={{ margin: '10px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <LinkSharpIcon sx={{ mr: 1, transform: 'rotate(135deg)' }} />
            <Typography variant="body1" style={{ fontSize: 15, color: 'gray', flexGrow: 1 }}>
              https://dev--devtaskwisefrontend.netlify.app
            </Typography>
            <Button 
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none' }}
              onClick={handleCopy}> 
              Copy
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

ShareJoiningLinkModel.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ShareJoiningLinkModel;
