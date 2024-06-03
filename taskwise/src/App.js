import React, { useState } from "react";
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
import WorkspacesPage from "./pages/Workspace/WorkspacePage";
import MyTaskPage from "./pages/MyTaskPage/MyTaskPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Drawer from "@mui/material/Drawer";
import WorkspaceDetails from "./pages/Workspace/WorkspaceDetails";
import NewTaskPage from "./pages/Board/NewTaskPage";
import TaskDetailsPage from "./pages/Board/TaskDetailsPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import Board from "./pages/Board/Board";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import VerificationPage from "./pages/ForgotPassword/VerificationPage";
import ResetPasswordPage from "./pages/ForgotPassword/ResetPasswordPage";
import ConfirmationPage from "./pages/ForgotPassword/ConfirmationPage";
import ProfileSettingsPage from "./pages/ProfilePage/ProfilePage";
import FirstPage from "./components/FirstPage";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
});

function AppLayout() {
  const location = useLocation();
  const isLandingPage = [
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/verification",
    "/resetpassword",
    "/confirmation",
    "/firstpage",
  ].includes(location.pathname);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
                  sx: { overflow: "hidden" },
                }}
              >
                <Sidebar />
              </Drawer>
            ) : (
              <Sidebar />
            )}
          </>
        )}
        <main
          style={
            isLandingPage
              ? {}
              : { backgroundColor: "#f0f0f0", padding: "20px", flexGrow: 1 }
          }
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/firstpage" element={<FirstPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/:id" element={<Board />} />
            <Route path="/projects/:id/new-task" element={<NewTaskPage />} />
            <Route path="/tasks/:taskID" element={<TaskDetailsPage />} />
            <Route path="/workspaces" element={<WorkspacesPage />} />
            <Route path="/workspaces/:id" element={<WorkspaceDetails />} />
            <Route path="/my-tasks" element={<MyTaskPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />
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
