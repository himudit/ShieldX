import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const PublicRoute: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard/overview" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
