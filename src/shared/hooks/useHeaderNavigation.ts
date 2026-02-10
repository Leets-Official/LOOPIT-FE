import { PROTECTED_PATHS, ROUTES } from '@shared/constants';
import { useUIStore } from '@shared/stores';
import { useNavigate } from 'react-router';

type UseHeaderNavigationParams = {
  isLoggedIn: boolean;
  closeMobileMenu: () => void;
};

export const useHeaderNavigation = ({ isLoggedIn, closeMobileMenu }: UseHeaderNavigationParams) => {
  const navigate = useNavigate();
  const { showLoginModal, openLoginModal, closeLoginModal } = useUIStore();

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN, { viewTransition: true });
    closeMobileMenu();
  };

  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      closeMobileMenu();
      return;
    }
    navigate(ROUTES.MYPAGE, { viewTransition: true });
    closeMobileMenu();
  };

  const handleNavClick = (path: string) => {
    if (!isLoggedIn && PROTECTED_PATHS.includes(path)) {
      openLoginModal();
      closeMobileMenu();
      return;
    }
    navigate(path, { viewTransition: true });
    closeMobileMenu();
  };

  const handleLoginModalConfirm = () => {
    closeLoginModal();
    navigate(ROUTES.LOGIN, { viewTransition: true });
  };

  const handleLoginModalCancel = () => {
    closeLoginModal();
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
