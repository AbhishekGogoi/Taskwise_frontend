import React from 'react';
import './App.css';
import Header from './pages/workspace/Header';
import Sidebar from './pages/workspace/Sidebar';
import "@fontsource/manrope"; // Defaults to weight 400

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;
