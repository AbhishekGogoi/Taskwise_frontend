import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField, Button, Box, Typography, IconButton, Paper, MenuItem, Select,FormControl, FormHelperText } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { addTaskAsync, resetTaskAddStatus } from '../../features/project/projectSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewTaskPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState(null);
    const [assignees, setAssignees] = useState([]);
    const [errors, setErrors] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const colId = useSelector((state) => state?.project?.selectedProject?.order[0])
    const coldata = useSelector((state) => state?.project?.selectedProject?.columns)
    const titlesAndIds = coldata.map(item => ({
        title: item.title,
        id: item._id
    }));
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setErrors(prevErrors => ({ ...prevErrors, status: '' }));
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
        setErrors(prevErrors => ({ ...prevErrors, priority: '' }));
    };

    const handleAssigneesChange = (event) => {
        setAssignees(event.target.value);
    };

    const validateFields = () => {
        const newErrors = { title: '', description: '', priority: '', status: ''  };
        let hasError = false;

        if (!title.trim()) {
            newErrors.title = 'Title is required';
            hasError = true;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            hasError = true;
        }

        if (!priority) {
            newErrors.priority = 'Priority is required';
            hasError = true;
        }

        if (!status) {
            newErrors.status = 'Status is required';
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleCreateTask = () => {
        if (validateFields()) {

            const task = {
                taskName: title,
                content: description,
                columnId: status,
                dueDate: dueDate,
                priority: priority
                // assigneeUserID,
                // attachments,
            };
            dispatch(addTaskAsync({ task, id }));
            if (taskAddStatus !== "rejected") {
                navigate(-1);
            }
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (!e.target.value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, title: 'Title is required' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, title: '' }));
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (!e.target.value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, description: 'Description is required' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, description: '' }));
        }
    };
    const taskAddStatus = useSelector((state) => state.project.taskAddStatus);
    useEffect(() => {
        if (taskAddStatus == "rejected") {
            toast.error("Failed to add task.");
            dispatch(resetTaskAddStatus());
        }
    }, [taskAddStatus, dispatch]);

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
            <ToastContainer />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10rem" }}>
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
                    <Grid container spacing={20}>
                        {/* Left side - Form Fields */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem" }}>
                                Add a title <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Title"
                                value={title}
                                onChange={handleTitleChange}
                                sx={{
                                    mb: 4,
                                }}
                                error={!!errors.title}
                                helperText={errors.title}
                            />

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem" }}>
                                Add a description <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                variant="filled"
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Add your description here"
                                value={description}
                                onChange={handleDescriptionChange}
                                sx={{
                                    mb: 4, '& .MuiFilledInput-root': {
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                    },
                                }}
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem" }}>
                                Ask a question or add a comment
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Ask a question or add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    mb: 4
                                }}
                            />

                            <Box sx={{ mt: 3, mb: 4 }}>
                                <TextField
                                    label="Select due date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    sx={{
                                        height: 32,
                                        width: '100%',
                                        maxWidth: 200,
                                    }}
                                />
                            </Box>
                        </Grid>

                        {/* Right side - Task Details */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem" }}>
                                        Assign to
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 4 }}>
                                        <Select
                                            multiple
                                            value={assignees}
                                            onChange={handleAssigneesChange}
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
                                            <MenuItem value="" disabled>
                                                Select
                                            </MenuItem>
                                            <MenuItem value="Option 1">Option 1</MenuItem>
                                            <MenuItem value="Option 2">Option 2</MenuItem>
                                            <MenuItem value="Option 3">Option 3</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem", mr: "2.5" }}>
                                        Priority
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 6 }}>
                                    <FormControl sx={{ width: '100%', maxWidth: 200 }} error={!!errors.priority}>
                                            <Select
                                                value={priority}
                                                onChange={handlePriorityChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Priority Level' }}
                                                sx={{ height: 32 }}
                                            >
                                                <MenuItem value="" disabled>
                                                    Level
                                                </MenuItem>
                                                <MenuItem value="Low">Low</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="High">High</MenuItem>
                                            </Select>
                                            {!!errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontWeight: '700',
                                                mr: 2, // Add some right margin to the Typography component to space it from the Select component
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                mb: 1,
                                                fontSize: "1rem"
                                            }}
                                        >
                                            Status
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 5 }}>
                                        <FormControl sx={{ width: '100%', maxWidth: 200 }} error={!!errors.status}>
                                                <Select
                                                    value={status}
                                                    onChange={handleStatusChange}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Set Status' }}
                                                    sx={{ height: 32 }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Set Status
                                                    </MenuItem>
                                                    {titlesAndIds.map(item => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {!!errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 1, fontSize: "1rem" }}>
                                        Attachments
                                    </Typography>
                                    <Box sx={{ ml: '3rem' }}>
                                        <IconButton>
                                            <AddOutlinedIcon />
                                        </IconButton>
                                    </Box>
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
                                    onClick={()=>navigate(-1)}
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
        </Box>
    );
}

export default NewTaskPage;