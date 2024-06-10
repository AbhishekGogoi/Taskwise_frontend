import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TaskCard from './TaskCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; 
import './TaskList.css';
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { data } from './data';

const CustomBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 350px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'thin',
  'scrollbar-color': '#888 #e0e0e0',
}));

function TaskList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const aiData = useSelector((state) => state.ai?.aiData?.tasks);
  useEffect(() => {
    if (aiData) {
      setTasks(aiData);
    }
  }, [aiData]);

  const tasksPerRow = 3;
  const rowsPerPage = 1;
  const tasksPerPage = tasksPerRow * rowsPerPage;
  const totalPages = Math.ceil(tasks?.length / tasksPerPage);

  useEffect(() => {
    const newTotalPages = Math.ceil(tasks?.length / tasksPerPage);
    if (currentPage >= newTotalPages) {
      setCurrentPage(Math.max(0, newTotalPages - 1));
    }
  }, [tasks, currentPage, tasksPerPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleTaskClose = (taskToRemove) => {
    setTasks(prevTasks => prevTasks.filter(task => task !== taskToRemove));
  };

  const handleTaskEdit = (taskToEdit) => {
    console.log("Edit task:", taskToEdit);
  };

  const startIndex = currentPage * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const tasksToDisplay = tasks?.slice(startIndex, endIndex);

  const handleBackButtonClick = async () => {
    navigate(`/createai`);
  };

  const handleCreateProjectButtonClick = async () => {
    //
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
          height: "auto",
        }}
      >
        <Box sx={{ display: 'block', alignItems: 'center', p: 2 }}>
          <Typography variant="body1" component="div" sx={{ pl: 2, fontWeight: '550', color: "#00c6ff" }}>
            Your Project is here!
          </Typography>
          <Typography variant="body2" component="div" sx={{ pl: 2, pt: 0.5 }}>
            Tasks for your new project are ready, thanks to TaskWise AI! Customize everything to fit your preferences.
          </Typography>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: "auto",
          pt: 4,
        }}
      >
        <CustomBox>
          <Box className="pagination">
            <Button className="btn-link" onClick={handlePrevPage} disabled={currentPage === 0 || tasks?.length === 0}>
              <BsChevronLeft className="arrow-icon" />
            </Button>
            <div className="task-list">
              <div className="tasks-container">
                {tasksToDisplay?.length === 0 ? (
                  <Typography variant="body1" className="text-center">No tasks to display</Typography>
                ) : (
                  tasksToDisplay?.map((task, index) => (
                    <div key={index} className="task-card-container">
                      <TaskCard task={task} onClose={() => handleTaskClose(task)} onEdit={() => handleTaskEdit(task)} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <Button className="btn-link" onClick={handleNextPage} disabled={currentPage === totalPages - 1 || tasks?.length === 0}>
              <BsChevronRight className="arrow-icon" />
            </Button>
          </Box>
        </CustomBox>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", p: 4 }}>
        <Button
          variant="contained"
          className="corner-btn"
          sx={{
            marginRight: '8px',
            fontWeight: "bold",
            left: '0',
            borderRadius: '16px',
            backgroundColor: '#f0f0f0',
            color: 'black',
          }}
          onClick={handleBackButtonClick}
        >
          <BsChevronLeft sx={{ fontSize: '24px', marginRight: '20px' }} /> 
          <Typography sx={{ pl: '10px', }}>Back</Typography> 
        </Button>
        <Button
          variant="contained"
          className="corner-btn generate-board-btn"
          sx={{
            marginRight: '8px',
            fontWeight: "bold",
            right: '0',
            borderRadius: '16px'
          }}
          onClick={handleCreateProjectButtonClick}
        >
          Create Project
        </Button>
      </Box>
    </Box>
  );
}

export default TaskList;
