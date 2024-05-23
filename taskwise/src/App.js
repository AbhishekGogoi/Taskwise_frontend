import "./App.css";
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
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import VerificationPage from "./pages/ForgotPassword/VerificationPage";
import ResetPasswordPage from "./pages/ForgotPassword/ResetPasswordPage";
import ConfirmationPage from "./pages/ForgotPassword/ConfirmationPage";

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
    "/forgotpassword/verification",
    "/forgotpassword/resetpassword",
    "/forgotpassword/confirmation",
  ].includes(location.pathname);
  return (
    <>
      {!isLandingPage && <Header />}
      <div style={isLandingPage ? {} : { display: "flex" }}>
        {!isLandingPage && <Sidebar />}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route
              path="/forgotpassword/verification"
              element={<VerificationPage />}
            />
            <Route
              path="/forgotpassword/resetpassword"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/forgotpassword/confirmation"
              element={<ConfirmationPage />}
            />
            <Route path="/projects" element={<ProjectPage />} />
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
