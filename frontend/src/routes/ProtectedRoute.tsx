import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <UnauthorizedPage />;
};

export default ProtectedRoute;