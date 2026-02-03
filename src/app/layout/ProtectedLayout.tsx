import { useAuthStore } from '@shared/stores';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
