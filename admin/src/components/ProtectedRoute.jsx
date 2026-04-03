import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const adminInfo = localStorage.getItem('adminInfo');

    if (!adminInfo) {
        return <Navigate to="/login" replace />;
    }

    try {
        const parsed = JSON.parse(adminInfo);
        // Additional layer: Ensure the stored user actually bears the ADMIN role locally
        if (parsed.role !== 'ADMIN') {
            return <Navigate to="/login" replace />;
        }
    } catch (e) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
