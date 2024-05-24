import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from "./Column";
import { useState } from 'react';
function Board() {
    const { id } = useParams();
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
        console.log("handleDrop",taskId,newColumnId)
        const updatedColumns = { ...columns };
        // Remove task from current column
        Object.keys(updatedColumns).forEach(columnId => {
            updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(id => id !== taskId);
        });
        // Add task to the target column
        updatedColumns[newColumnId].taskIds.push(taskId);
        setColumns(updatedColumns);
        console.log("updatedcolumns",updatedColumns)
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
                        height: 100,
                    }}
                >

                </Paper>
                <Container className='droppable-container' style={{ display: "flex", justifyContent: 'space-between' }}>
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