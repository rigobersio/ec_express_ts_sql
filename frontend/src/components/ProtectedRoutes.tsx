import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import valor global de autenticación 

const ProtectedRoutes: React.FC = () => {
  const isAuthenticated: boolean = true; // ajustar esto para que sea una variable global

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
