import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px none #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddMemberToWorkspaceModel = ({ handleClose }) => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const userId = useSelector((state) => state?.user?.loggedInUser?.user?._id);

  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [membersError, setMembersError] = useState('');

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

  return (
    <Box sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography id="workspace-title" variant="h5" component="h2" style={{ fontWeight: 550 }}>
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
        {members.map((email) => (
          <Chip
            key={email}
            label={email}
            onDelete={handleDeleteMember(email)}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ textTransform: 'none', backgroundColor: "#f0f0f0" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

AddMemberToWorkspaceModel.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddMemberToWorkspaceModel;
