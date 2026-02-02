import { Header } from '@shared/ui/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mt-header-total">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
