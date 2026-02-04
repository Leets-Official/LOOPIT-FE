import { ROUTES } from '@shared/constants';
import { useAuthStore } from '@shared/stores';
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const { accessToken, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return null;
  }

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
