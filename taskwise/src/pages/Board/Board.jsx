import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from "./Column";
import { useState } from 'react';
import { Box, Paper, CardMedia, Typography, CardActions,Container} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%', // Start with full width within its container
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f0f0f0",
    marginLeft: 0,
    width: '200px', // Default width
    height: '30px', // Fixed height
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create('width'), // Animate width change
    '&:focus-within': {
        width: '300px', // Expanded width on focus
    },
}));



function Board() {
    const { id } = useParams();
    const project = {
        img: 'https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96'
    };
    const initialData = {
        order: [1, 2, 3],
        columns: {
            1: { id: 1, title: 'To Do', taskIds: [1, 2] },
            2: { id: 2, title: 'In Progress', taskIds: [3] },
            3: { id: 3, title: 'Done', taskIds: [4] },
        },
        tasks: {
            1: { id: 1, content: 'Take out the garbage' },
            2: { id: 2, content: 'Watch my favorite show' },
            3: { id: 3, content: 'Charge my phone' },
            4: { id: 4, content: 'Cook dinner' },
        },
    };
    const [columns, setColumns] = useState(initialData.columns);

    const handleDrop = (taskId, newColumnId) => {
        console.log("handleDrop", taskId, newColumnId)
        const updatedColumns = { ...columns };
        // Remove task from current column
        Object.keys(updatedColumns).forEach(columnId => {
            updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(id => id !== taskId);
        });
        // Add task to the target column
        updatedColumns[newColumnId].taskIds.push(taskId);
        setColumns(updatedColumns);
        console.log("updatedcolumns", updatedColumns)
    };
    return (
        <DndProvider backend={HTML5Backend}>
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
                        height: 150,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Box sx={{ width: "10%", pl: 4, pt: 1 }}>
                                <CardMedia
                                    component="img"
                                    alt="project image"
                                    height="55"
                                    sx={{ borderRadius: 2 }}
                                    image={project.img}
                                />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '0.8rem', pt: 1 }}>
                                    Board / Details
                                </Typography>

                                <Box sx={{ display: "flex", gap: 3 }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.2rem', pt: 0.5 }}>
                                        Book App
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.2rem', pt: 0.5 }}>
                                        Group A
                                    </Typography>
                                </Box>
                            </Box>


                        </Box>
                        <Box sx={{ width: '250px', height: '30px', paddingLeft: "15px" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Box>
                    </Box>
                    <Divider component="div" role="presentation">
                    </Divider>
                    <CardActions sx={{ pt: 2, pr: 6, float: "right" }}>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            New Task
                        </Button>
                    </CardActions>
                </Paper>
                <Container className='droppable-container' style={{ display: "flex", alignItems: 'flex-start' }}>
                    {initialData.order.map((columnId) => {
                        // const column = initialData.columns[columnId];
                        const column = columns[columnId];
                        const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks} onDrop={handleDrop} />;
                    })}
                </Container>
            </Box>
        </DndProvider>
    )
}

export default Board