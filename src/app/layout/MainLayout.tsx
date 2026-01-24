import { Header } from '@shared/ui/Header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

export default function MainLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsLoggedIn(Boolean(window.localStorage.getItem('loopit:isLoggedIn')));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLoggedIn={isLoggedIn}
        user={isLoggedIn ? { profileImage: '/profile-sample.jpg', nickname: '루핏' } : undefined}
      />
      <Outlet />
    </div>
  );
}
