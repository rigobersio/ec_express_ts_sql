import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/store';

const AdminRoute: React.FC = () => {
    const role = useStore((state) => state.role);

    return role === 'admin' ? <Outlet /> : <Navigate to="/profile" />;
};

export default AdminRoute;
