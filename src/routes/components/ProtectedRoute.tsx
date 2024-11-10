import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

import { RouterPath } from '../path';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={`${RouterPath.login}?redirect=${encodeURIComponent(location.pathname)}`} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
