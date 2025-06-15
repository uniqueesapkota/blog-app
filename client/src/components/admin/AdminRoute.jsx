import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token || isAdmin !== 'true') {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.verifyToken();
                if (response.success) {
                    setIsAuthenticated(true);
                } else {
                    // Token is invalid, clear storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('isAdmin');
                }
            } catch (error) {
                console.error('Token verification error:', error);
                // Error verifying token, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('isAdmin');
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token, isAdmin]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!token || !isAuthenticated || isAdmin !== 'true') {
        // Redirect to login if not authenticated as admin
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminRoute;
