import { Container, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import Task from './Task';

function Column({ colData }) {
    console.log(colData)
    return (
        <Container>
            <Container sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    {colData.title}
                </Typography>
                <IconButton color="primary" aria-label="add task">
                    <AddIcon />
                </IconButton>
            </Container>
            <Container style={{display:"flex",flexDirection:"column"}}>
                {colData.taskIds.map((task,index)=>(
                    <Task key={index} tid={task}/>
                ))}
            </Container>
        </Container>
    )
}

export default Column