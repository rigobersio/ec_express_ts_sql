import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/store';

const ProtectedRoutes: React.FC = () => {
  const token = useStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
