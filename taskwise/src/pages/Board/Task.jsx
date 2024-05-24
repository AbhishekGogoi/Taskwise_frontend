import React from 'react'
import { Paper, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

function Task({ task }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (
        <Paper
            ref={drag} // Attach the drag source ref to the Paper component
            className="draggable-item"
            elevation={2}
            sx={{ padding: 2, margin: 1, width: '100%', opacity: isDragging ? 0.5 : 1 }} // Adjust opacity while dragging
        >
            <Typography>{task.content}</Typography>
        </Paper>
    )
}

export default Task