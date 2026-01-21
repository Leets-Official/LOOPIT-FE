import { AlertDotIcon, HamburgerIcon } from '@shared/assets/icons';
import { Logo } from '@shared/assets/logo';
import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui/Button/Button';
import { headerVariants } from '@shared/ui/Header/Header.variants';
import { UserMenu } from '@shared/ui/Header/UserMenu';
import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const NAV_ITEMS = [
  { id: 'buy', label: '구매하기', path: ROUTES.BUY },
  { id: 'sell', label: '판매하기', path: ROUTES.SELL },
  { id: 'repair', label: '수리점찾기', path: ROUTES.REPAIR },
  { id: 'chat', label: '루핏톡', path: ROUTES.CHAT },
  { id: 'chatbot', label: '챗봇', path: ROUTES.CHATBOT },
] as const;

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'> & {
  isLoggedIn?: boolean;
  user?: { profileImage?: string; nickname?: string };
  onLogoutClick?: () => void;
  hasChatAlert?: boolean;
};

export const Header = ({
  className,
  isLoggedIn = false,
  user,
  onLogoutClick,
  hasChatAlert = false,
  ...props
}: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const styles = headerVariants();

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
    setIsMobileMenuOpen(false);
  };

  const handleMyPageClick = () => {
    navigate(ROUTES.MYPAGE);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header {...props} className={styles.root({ className })}>
      <Logo className={styles.logo()} />

      <div className={styles.desktopNav()}>
        <nav className={styles.navList()}>
          {NAV_ITEMS.map((item) => (
            <button type="button" key={item.id} onClick={() => handleNavClick(item.path)} className={styles.navItem()}>
              {item.label}
              {item.id === 'chat' && hasChatAlert && <AlertDotIcon className="absolute -top-1 -right-2" />}
            </button>
          ))}
        </nav>
        {isLoggedIn ? (
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
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={styles.mobileMenuButton()}
          aria-expanded={isMobileMenuOpen}
          aria-label="메뉴 열기"
        >
          <HamburgerIcon className={styles.mobileMenuIcon()} />
        </button>

        {isMobileMenuOpen && (
          <div className={styles.mobileDropdown()}>
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={styles.mobileNavItem()}
                >
                  {item.label}
                  {item.id === 'chat' && hasChatAlert && <AlertDotIcon className="ml-1" />}
                </button>
              ))}
            </nav>
            <div className={styles.mobileDivider()} />
            {isLoggedIn ? (
              <div className={styles.mobileAuthSection()}>
                <button type="button" onClick={handleMyPageClick} className={styles.mobileAuthButton()}>
                  마이페이지
                </button>
                <button
                  type="button"
                  onClick={onLogoutClick}
                  className={styles.mobileAuthButton({ className: 'text-gray-500' })}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className={styles.mobileLoginWrapper()}>
                <Button variant="fill" size="full" onClick={handleLoginClick}>
                  로그인
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
