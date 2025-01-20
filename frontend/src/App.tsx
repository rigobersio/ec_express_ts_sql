import React from 'react';
import { Outlet, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;
