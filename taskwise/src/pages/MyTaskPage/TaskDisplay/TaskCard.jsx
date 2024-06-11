import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, IconButton, Tooltip, Modal, Box, TextField } from '@mui/material';
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import './TaskCard.css';
import Projects from "../../../assets/Projects.png";
import WorkspaceIconBlack from "../../../assets/WorkspaceIconBlack.png";

const TaskCard = ({ task, onClose, onEdit }) => {
  const [showAttachments, setShowAttachments] = useState(false);

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  return (
    <Card className="task-card" sx={{
        width: 400,
        height: 'calc(100vh - 100px)',
        borderRadius: 2,
        p: 1
      }}>
      <div className="task-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <img src={WorkspaceIconBlack} alt="Workspace" style={{ width: 20, height: 20, marginRight: '5px' }} />
            <Typography variant="body2" color="textSecondary">
              {task.workspace}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Projects} alt="Project" style={{ width: 20, height: 20, marginRight: '5px' }} />
            <Typography variant="body2" color="textSecondary">
              {task.project}
            </Typography>
          </div>
        </div>
        <div className="task-actions">
          <Tooltip title="Close">
            <IconButton className="close-icon" onClick={onClose}>
              <CloseIcon size={10} style={{
                color: "#4b4b4b",
                fontWeight: "bold",
                borderRadius: "10px",
              }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="scrollable-content">
        <CardContent className="task-card-content" sx={{ mt: 5, textAlign: 'left' }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ pt: 1}}>
            {task.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong>Assignee:</strong> {task.assigneeUserID.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong>Creator:</strong> {task.createdBy.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong>Priority:</strong> {task.priority}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong sx={{ pr: 4}}>Content:</strong> {task.content}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ pt: 1}}>
            <strong>Attachments: </strong> {task.attachments.length}
            <IconButton onClick={toggleAttachments}>
              <ExpandMoreIcon />
            </IconButton>
          </Typography>
          <Modal
            open={showAttachments}
            onClose={toggleAttachments}
            aria-labelledby="attachment-modal"
            aria-describedby="attachment-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              // border: '2px solid #000',
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
            }}>
              <ul>
                {task.attachments.map(attachment => (
                  <li key={attachment._id.$oid}>
                    <a href={attachment.docUrl} target="_blank" rel="noreferrer">{attachment.docName}</a>
                  </li>
                ))}
              </ul>
            </Box>
          </Modal>
          <Typography variant="body2" color="textSecondary">
              <TextField
                id="project-name"
                label="post an update"
                fullWidth
                margin="normal"
                style={{ marginBottom: "20px", backgroundColor: "white" }}
              />
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskCard;
