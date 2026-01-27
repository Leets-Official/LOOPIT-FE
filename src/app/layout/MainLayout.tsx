import { Header } from '@shared/ui/Header';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-spacing-header-content)">
        <Outlet />
      </div>
    </div>
  );
}
