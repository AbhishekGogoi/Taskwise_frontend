// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/workspace/Login';
import Workspace from './pages/workspace/Workspace';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </Router>
  );
};

export default App;
