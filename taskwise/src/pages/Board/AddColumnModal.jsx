import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";

function AddColumnModal({ open, onClose, onAddColumn }) {
  const [newColumnName, setNewColumnName] = useState("");

  const handleClose = () => {
    setNewColumnName(""); // Clear input field when closing
    onClose();
  };

  const handleAddColumn = () => {
    onAddColumn(newColumnName); // Pass the new column name to the parent component
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter the name of the new column:</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Please enter the name of the new column:
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          label="Column Name"
          type="text"
          fullWidth
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddColumn} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddColumnModal;
