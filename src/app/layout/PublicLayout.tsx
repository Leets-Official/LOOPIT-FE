import { ROUTES } from '@shared/constants';
import { useAuthStore } from '@shared/stores';
import { Navigate, Outlet } from 'react-router';

const PublicLayout = () => {
  const { accessToken, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return null;
  }

  if (accessToken) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
