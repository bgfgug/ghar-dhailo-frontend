
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'user' | 'admin' | 'driver'>;
  redirectPath?: string;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['user', 'admin', 'driver'],
  redirectPath = '/auth/login',
  requireAuth = true
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-gray-500">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    // Save the location the user was trying to access for redirect after login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // Check role-based access if user is authenticated
  if (isAuthenticated && user && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'driver') {
      return <Navigate to="/driver/dashboard" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
