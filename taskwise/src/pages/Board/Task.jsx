import React from 'react'
import { Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Chip, Box, IconButton } from '@mui/material';
import { DateRange, AttachFile,MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function Task({ task }) {
    const navigate=useNavigate();
    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (

        <Card
            sx={{
                maxWidth: '300px',  // Set max width
                minWidth: '250px',  // Set min width
                maxHeight: '250px', // Set max height
                minHeight: '100px'  // Set min height
            }}
            ref={drag} // Attach the drag source ref to the Paper component
            style={{cursor:"pointer", opacity:isDragging ? 0 : 2}}
            className="draggable-item"
            onClick={()=>navigate(`/tasks/${task.id}`)}
            >
            <CardContent sx={{p:"0.5rem" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                        label="Low"
                        color="success"
                        size="small"
                        sx={{ fontSize: '0.4rem', height: '15px' }}
                    />
                    <IconButton>
                        <MoreVert sx={{ fontSize: '0.75rem' }} />
                    </IconButton>
                </Box>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: '1rem' }}
                >
                    {task.content}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.4rem' }}
                >
                    Pellentesque eget nulla turpis. Sed ligula dui, porta ac commodo nec, iaculis eget nibh
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-around"
                    my={.5}
                    sx={{ flexWrap: 'wrap' }}
                >
                    <img
                        src='https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96' // Image URL or path"
                        alt="Moodboard Image 1"
                        style={{ width: '45%', marginBottom: '8px' }}
                    />
                    <img
                        src='https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96' // Image URL or path"
                        alt="Moodboard Image 2"
                        style={{ width: '45%', marginBottom: '8px' }}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <DateRange sx={{ fontSize: '0.75rem' }} />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={0.5}
                            sx={{ fontSize: '0.7rem' }}
                        >
                            Oct
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <AttachFile sx={{ fontSize: '0.75rem' }} />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={0.5}
                            sx={{ fontSize: '0.7rem' }}
                        >
                            2
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

        </Card>
    )
}

export default Task