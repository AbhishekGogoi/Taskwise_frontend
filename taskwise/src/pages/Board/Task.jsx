import React from 'react'
import { Paper,Typography } from '@mui/material'
function Task({ task }) {

    return (
        <Paper elevation={2} sx={{ padding: 2, margin: 1, width: '100%' }}>
            <Typography>{task.content}</Typography>
        </Paper>
    )
}

export default Task