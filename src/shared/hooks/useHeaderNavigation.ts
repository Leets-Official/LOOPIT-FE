import { PROTECTED_PATHS, ROUTES } from '@shared/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type UseHeaderNavigationParams = {
  isLoggedIn: boolean;
  closeMobileMenu: () => void;
};

export const useHeaderNavigation = ({ isLoggedIn, closeMobileMenu }: UseHeaderNavigationParams) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN, { viewTransition: true });
    closeMobileMenu();
  };

  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      closeMobileMenu();
      return;
    }
    navigate(ROUTES.MYPAGE, { viewTransition: true });
    closeMobileMenu();
  };

  const handleNavClick = (path: string) => {
    if (!isLoggedIn && PROTECTED_PATHS.includes(path)) {
      setShowLoginModal(true);
      closeMobileMenu();
      return;
    }
    navigate(path, { viewTransition: true });
    closeMobileMenu();
  };

  const handleLoginModalConfirm = () => {
    setShowLoginModal(false);
    navigate(ROUTES.LOGIN, { viewTransition: true });
  };

  const handleLoginModalCancel = () => {
    setShowLoginModal(false);
  };

  return {
    showLoginModal,
    handleLoginClick,
    handleMyPageClick,
    handleNavClick,
    handleLoginModalConfirm,
    handleLoginModalCancel,
  };
};
