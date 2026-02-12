import { AlertDotIcon, HamburgerIcon } from '@shared/assets/icons';
import { NAV_ITEMS } from '@shared/constants';
import { useClickOutside, useHeaderNavigation, useModal } from '@shared/hooks';
import { Button } from '@shared/ui/Button/Button';
import { headerVariants } from '@shared/ui/Header/Header.variants';
import { UserMenu } from '@shared/ui/Header/UserMenu';
import { Logo } from '@shared/ui/Logo';
import { Modal } from '@shared/ui/Modal';
import { cn } from '@shared/utils/cn';
import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'> & {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  user?: { profileImage?: string; nickname?: string };
  onLogoutClick?: () => void;
  hasChatAlert?: boolean;
};

export const Header = ({
  className,
  isLoading = false,
  isLoggedIn = false,
  user,
  onLogoutClick,
  hasChatAlert = false,
  ...props
}: HeaderProps) => {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useModal();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = headerVariants({ scrolled: isScrolled });

  const {
    showLoginModal,
    handleLoginClick,
    handleMyPageClick,
    handleNavClick,
    handleLoginModalConfirm,
    handleLoginModalCancel,
  } = useHeaderNavigation({ isLoggedIn, closeMobileMenu });

  useClickOutside(mobileMenuRef, isMobileMenuOpen, closeMobileMenu);

  return (
    <header {...props} className={styles.root({ className })}>
      <div className={styles.inner()}>
        <Logo className={styles.logo()} />

        <div className={styles.desktopNav()}>
          <nav className={styles.navList()}>
            {NAV_ITEMS.map((item) => {
              const isCurrent = pathname.startsWith(item.path);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={styles.navItem()}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                  {item.id === 'chat' && hasChatAlert && <AlertDotIcon className="absolute -top-1 -right-2" />}
                </button>
              );
            })}
          </nav>
          {isLoading ? (
            <div className="h-[44px] w-[89px] animate-pulse rounded-(--radius-l) bg-gray-200" />
          ) : isLoggedIn ? (
            <UserMenu
              profileImage={user?.profileImage}
              nickname={user?.nickname}
              onMyPageClick={handleMyPageClick}
              onLogoutClick={onLogoutClick}
            />
          ) : (
            <Button variant="fill" size="auto" onClick={handleLoginClick}>
              로그인
            </Button>
          )}
        </div>

        <div className={styles.mobileMenuWrapper()} ref={mobileMenuRef}>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={styles.mobileMenuButton()}
            aria-expanded={isMobileMenuOpen}
            aria-label="메뉴 열기"
          >
            <HamburgerIcon className={styles.mobileMenuIcon()} />
          </button>

          <div
            className={cn(
              styles.mobileDropdown(),
              isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
            )}
          >
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isCurrent = pathname.startsWith(item.path);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    className={styles.mobileNavItem()}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.label}
                    {item.id === 'chat' && hasChatAlert && <AlertDotIcon className="ml-1" />}
                  </button>
                );
              })}
            </nav>
            <div className={styles.mobileDivider()} />
            {isLoggedIn ? (
              <>
                <button type="button" onClick={handleMyPageClick} className={styles.mobileNavItem()}>
                  마이페이지
                </button>
                <button
                  type="button"
                  onClick={onLogoutClick}
                  className={styles.mobileNavItem({ className: 'text-gray-500' })}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <div className={styles.mobileLoginWrapper()}>
                <Button variant="fill" size="full" onClick={handleLoginClick}>
                  로그인
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <Modal
          title="로그인이 필요합니다"
          subtitle="로그인 페이지로 이동하시겠습니까?"
          cancelText="취소"
          confirmText="로그인"
          onCancel={handleLoginModalCancel}
          onConfirm={handleLoginModalConfirm}
        />
      )}
    </header>
  );
};
