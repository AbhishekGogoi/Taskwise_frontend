import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjectByIdAsync } from "../../features/project/projectSlice";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%", // Start with full width within its container
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f0f0f0",
  marginLeft: 0,
  paddingRight: theme.spacing(2), // Add right-side padding
  width: "200px", // Default width
  height: "30px", // Fixed height
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create("width"), // Animate width change
  "&:focus-within": {
    width: "300px", // Expanded width on focus
  },
}));

function Board() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectByIdAsync(id));
    }
  }, [dispatch, id]);
  // console.log(id)
  const initialBoardData = useSelector((state) => state.project.selectedProject);
  console.log(initialBoardData)


  const handleClick = () => {
    navigate(`/projects/${id}/new-task`);
  };
  const project = {
    img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96",
  };
  const initialData = {
    order: [1, 2, 3, 4, 5, 6],
    columns: {
      1: { id: 1, title: "To Do", taskIds: [1, 2] },
      2: { id: 2, title: "In Progress", taskIds: [3] },
      3: { id: 3, title: "Done", taskIds: [4] },
      4: { id: 4, title: "Review", taskIds: [5, 6] },
      5: { id: 5, title: "QA", taskIds: [7] },
      6: { id: 6, title: "Deploy", taskIds: [8] },
    },
    tasks: {
      1: { id: 1, content: "Take out the garbage" },
      2: { id: 2, content: "Watch my favorite show" },
      3: { id: 3, content: "Charge my phone" },
      4: { id: 4, content: "Cook dinner" },
      5: { id: 5, content: "Finish report" },
      6: { id: 6, content: "Clean the house" },
      7: { id: 7, content: "Go for a run" },
      8: { id: 8, content: "Attend meeting" },
    },
  };
  const [columns, setColumns] = useState(initialData.columns);

  const handleDrop = (taskId, newColumnId) => {
    console.log("handleDrop", taskId, newColumnId);
    const updatedColumns = { ...columns };
    // Remove task from current column
    Object.keys(updatedColumns).forEach((columnId) => {
      updatedColumns[columnId].taskIds = updatedColumns[
        columnId
      ].taskIds.filter((id) => id !== taskId);
    });
    // Add task to the target column
    updatedColumns[newColumnId].taskIds.push(taskId);
    setColumns(updatedColumns);
    console.log("updatedcolumns", updatedColumns);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: 120,
            maxWidth:"100%"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <img
                src={project.img}
                alt="project"
                style={{
                  borderRadius: "8px",
                  width: "44px",
                  height: "44px",
                  padding: "12px",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "0.8rem", pt: 1 }}
                >
                  Board / Details
                </Typography>
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "1rem", pt: 0.5 }}
                  >
                    Book App
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box padding={"10px"}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Box>
          <Divider component="div" role="presentation" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "8px",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                fontSize: "0.70rem",
                padding: "4px 8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              //startIcon={<AddIcon />} // AddIcon will be displayed before the button label
              onClick={handleClick}
            >
              Add new task
            </Button>
          </Box>
        </Paper>
        <Box sx={{
            display: 'flex',
            overflow: 'auto',
            width: '100%',
            maxWidth: '1600px', 
            padding: 2,
        }}>
        <Grid container spacing={2} direction="row" wrap="nowrap" sx={{marginTopt:"3"}} alignItems="flex-start">
          {initialData.order.map((columnId) => {
            const column = columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => initialData.tasks[taskId]
            );
            return (
              <Grid key={column.id}>
                <Column column={column} tasks={tasks} onDrop={handleDrop} />
              </Grid>
            );
          })}
        </Grid>
        </Box>
      </Box>
    </DndProvider>
  );
}

export default Board;
