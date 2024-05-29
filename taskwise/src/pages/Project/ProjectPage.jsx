import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import NewProjectModel from "../../components/NewProjectModel";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectAsync } from "../../features/project/projectSlice";

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
  width: "200px", // Default width
  height: "30px", // Fixed height
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create("width"), // Animate width change
  "&:focus-within": {
    width: "300px", // Expanded width on focus
  },
}));
const CustomBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100vh - 160px)",
  overflowY: "auto",
  padding: theme.spacing(2),
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none", // IE and Edge
  "scrollbar-width": "none", // Firefox
}));
// const projectsData = [
//   {
//     id: 1,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 2,
//     name: "Project 2",
//     workspace: "Workspace 2",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 3,
//     name: "Project 3",
//     workspace: "Workspace 3",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 4,
//     name: "Project 3",
//     workspace: "Workspace 3",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 5,
//     name: "Project 3",
//     workspace: "Workspace 3",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 6,
//     name: "Project 3",
//     workspace: "Workspace 3",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 7,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 8,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 9,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 10,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
//   {
//     id: 11,
//     name: "Project 1",
//     workspace: "Workspace 1",
//     img: "https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149001650.jpg?t=st=1716280160~exp=1716280760~hmac=f254cfeda21a263638253b9f6f0c0c9028bac218840dea34d6de5739054a4a96", // Image URL or path
//   },
// ];

function ProjectPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.project.projects);
  console.log(projectData);
  // const state = useSelector((state) => state);
  // console.log(state);

  useEffect(() => {
    dispatch(fetchProjectAsync());
  }, [dispatch]);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
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
          width: "100%",
          height: 100,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{ p: 2, fontWeight: "bold" }}
          >
            Projects
          </Typography>
          <Stack spacing={2} direction="row" sx={{ pr: 2 }}>
            <Button
              variant="contained"
              size="small"
              sx={{ fontSize: "0.70rem", padding: "4px 8px" }}
            >
              Create with AI
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ fontSize: "0.70rem", padding: "4px 8px" }}
              onClick={handleOpenModal}
            >
              New Project
            </Button>
          </Stack>
        </Box>
        <Box sx={{ width: "300px", height: "30px", paddingLeft: "15px" }}>
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
      </Paper>
      <CustomBox>
        <Grid container spacing={3} alignItems="center">
          {projectData?.map((project) => (
            <Grid item key={project.id} xs={6} sm={6} md={3} lg={3} xl={2}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </CustomBox>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box>
          <NewProjectModel handleClose={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
}

export default ProjectPage;
