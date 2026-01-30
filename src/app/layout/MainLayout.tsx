import { Header } from '@shared/ui/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
