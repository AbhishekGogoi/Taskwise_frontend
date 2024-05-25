import { Container, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import Task from './Task';

function Column({ column, tasks }) {
    console.log(tasks)
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
            <Container style={{ display: "flex", flexDirection: "column" }}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </Container>
        </Container>
    )
}

export default Column