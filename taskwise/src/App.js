import React, { useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProjectPage from "./pages/Project/ProjectPage";
import LandingPage from "./pages/landingPage/LandingPage";
import WorkspacesPage from "./pages/Workspaces/Workspaces";
import MyTaskPage from "./pages/MyTaskPage/MyTaskPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Board from './pages/Board/Board';
import NewTaskPage from './pages/Board/NewTaskPage';
import TaskDetailsPage from './pages/Board/TaskDetailsPage';

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
});

function AppLayout() {
  const location = useLocation();
  const isLandingPage = ["/", "/login", "/signup"].includes(location.pathname);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {!isLandingPage && (
        <Header isSmallScreen={isSmallScreen} toggleDrawer={toggleDrawer} />
      )}
      <div style={isLandingPage ? {} : { display: "flex" }}>
        {!isLandingPage && (
          <>
            {isSmallScreen ? (
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                PaperProps={{
                  sx: { overflow: 'hidden' },
                }}
              >
                <Sidebar />
              </Drawer>
            ) : (
              <Sidebar />
            )}
          </>
        )}
        <main style={isLandingPage ? {} : { backgroundColor: "#f0f0f0", padding: "20px", flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path='/projects/:id' element={<Board/>}/>
            <Route path="/projects/:id/new-task" element={<NewTaskPage/>} />
            <Route path='/projects/:id/tasks/:taskID' element={<TaskDetailsPage/>}/>
            <Route path="/workspaces" element={<WorkspacesPage />} />
            <Route path="/my-tasks" element={<MyTaskPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
