import { Container, Typography, IconButton, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import Task from './Task';
import { useDrop } from 'react-dnd';

function Column({ column, tasks, onDrop }) {
    const [{ isOver }, drop] = useDrop({
        accept: 'task', // Specify the accepted item type here
        drop: (item) => onDrop(item.id, column.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    //console.log(tasks)
    return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        {column.title}
                    </Typography>
                    <IconButton color="primary" aria-label="add task">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box
                    ref={drop}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        minWidth: { xs: '100%', sm: '300px' },
                        minHeight: { xs: '400px', sm: '600px' },
                        maxWidth: { xs: '100%', sm: '300px' },
                        maxHeight: { xs: '100%', sm: '600px' },
                        p: 2,
                        overflow: 'auto', // Optional: add overflow to handle large number of tasks
                    }}
                >
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </Box>
            </Box>
      
    )
}

export default Column