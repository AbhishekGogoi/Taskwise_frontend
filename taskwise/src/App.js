
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingPage from './pages/landingPage/LandingPage';
const theme = createTheme({
  typography: {
    fontFamily: 'Manrope, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage/>
    </ThemeProvider>
  );
}

export default App;
