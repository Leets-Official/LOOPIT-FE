import { useAuthStore } from '@shared/stores';
import { Navigate, Outlet } from 'react-router';

const PublicLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
