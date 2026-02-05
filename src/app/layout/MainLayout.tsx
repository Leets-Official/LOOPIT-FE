import { useLogoutMutation } from '@shared/apis/auth';
import { useAuth } from '@shared/apis/user';
import { Header } from '@shared/ui/Header';
import { Footer } from '@shared/ui/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        user={user ? { profileImage: user.profileImage, nickname: user.nickname } : undefined}
        onLogoutClick={handleLogout}
      />
      <div className="mt-header-total">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
