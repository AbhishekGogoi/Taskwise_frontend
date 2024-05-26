import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Box, Typography, IconButton, Paper, MenuItem, Select } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function NewTaskPage() {
    //const { id } = useParams();
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        console.log(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
        console.log(event.target.value);
    };

    const handleCreateTask = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Grid container spacing={5}>
                    {/* Left side - Form Fields */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                            Add a title <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Title"
                            sx={{
                                mb: 4,
                                '& input': {
                                    backgroundColor: '#ededed',
                                },
                            }}
                        />

                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                            Add a description <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            variant="filled"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Add your description here"
                            sx={{ mb: 4 }}
                        />

                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                            Ask a question or add a comment
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Ask a question or add a comment"
                            sx={{
                                mb: 4,
                                '& input': {
                                    backgroundColor: '#ededed',
                                },
                            }}
                        />

                        <Box sx={{ mt: 3, mb: 4 }}>
                            <TextField
                                label="Select due date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    height: 32,
                                    width: '100%',
                                    maxWidth: 200,
                                }}
                                onChange={(event) => console.log(event.target.value)}
                            />
                        </Box>
                    </Grid>

                    {/* Right side - Task Details */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Assign to
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2 }}>
                                    <Select
                                        multiple
                                        value={['Option 1']}
                                        onChange={(event) => console.log(event.target.value)}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.join(', ')}
                                            </div>
                                        )}
                                        sx={{
                                            height: 32,
                                            width: '100%',
                                            maxWidth: 200,
                                        }}
                                    >
                                        <MenuItem value="Option 1">Option 1</MenuItem>
                                        <MenuItem value="Option 2">Option 2</MenuItem>
                                        <MenuItem value="Option 3">Option 3</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3, mr: 2.5 }}>
                                    Priority
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2 }}>
                                    <Select
                                        value={priority}
                                        onChange={handlePriorityChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Priority Level' }}
                                        sx={{
                                            height: 32,
                                            width: '100%',
                                            maxWidth: 200,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Level
                                        </MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: 3,
                                            mr: 2, // Add some right margin to the Typography component to space it from the Select component
                                            textAlign: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        Status
                                    </Typography>
                                    <Select
                                        value={status}
                                        onChange={handleStatusChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Set Status' }}
                                        sx={{
                                            height: 32,
                                            width: '100%',
                                            maxWidth: 200,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Set Status
                                        </MenuItem>
                                        <MenuItem value="Not Started">Not Started</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>



                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Attachments
                                </Typography>
                                <IconButton>
                                    <AddOutlinedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{
                                    backgroundColor: '#f0f0f0',
                                    '&:hover': {
                                        backgroundColor: '#d0d0d0',
                                    },
                                }}
                                onClick={handleCreateTask}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleCreateTask}>
                                Create Task
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default NewTaskPage;
