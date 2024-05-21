import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProjectPage from "./pages/Project/ProjectPage";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
});

function AppLayout() {
  const location = useLocation();

  // Check if the current path is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && <Header />}
      <div style={{ display: 'flex' }}>
        {!isLandingPage && <Sidebar />}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectPage />} />
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
