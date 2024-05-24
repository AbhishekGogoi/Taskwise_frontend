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
import WorkspacesPage from "./pages/Workspaces/WorkspacePage";
import MyTaskPage from "./pages/MyTaskPage/MyTaskPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
});

function AppLayout() {
  const location = useLocation();
  const isLandingPage = ["/", "/login", "/signup"].includes(location.pathname);
  return (
    <div style={{backgroundColor: "#F1F2F4"}}>
      {!isLandingPage && <Header />}
      <div style={isLandingPage ? {} : { display: "flex" }}>
        {!isLandingPage && <Sidebar />}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/workspaces" element={<WorkspacesPage />} />
            <Route path="/my-tasks" element={<MyTaskPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
};

export default App;
