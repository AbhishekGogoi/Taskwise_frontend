import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
function Board() {
    const { id } = useParams();
    const initialData = {
        "order": [1, 2, 3],
        "columns": {
            "1": {
                "id": 1,
                "title": "To Do",
                "taskIds": [1, 2]
            },
            "2": {
                "id": 2,
                "title": "In Progress",
                "taskIds": [3]
            },
            "3": {
                "id": 3,
                "title": "Done",
                "taskIds": [4]
            }
        },
        "tasks": {
            "1": {
                "id": 1,
                "content": "Take out the garbage"
            },
            "2": {
                "id": 2,
                "content": "Watch my favorite show"
            },
            "3": {
                "id": 3,
                "content": "Charge my phone"
            },
            "4": {
                "id": 4,
                "content": "Cook dinner"
            }
        }
    };
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    height: 100,
                }}
            >

            </Paper>

        </Box>
    )
}

export default Board