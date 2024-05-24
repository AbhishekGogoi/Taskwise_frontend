import { Container, Typography, IconButton } from '@mui/material';
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
        <Container>
            <Container sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    {column.title}
                </Typography>
                <IconButton color="primary" aria-label="add task">
                    <AddIcon />
                </IconButton>
            </Container>
            <Container ref={drop} className="droppable-area" style={{ display: "flex", flexDirection: "column" }}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </Container>
        </Container>
    )
}

export default Column