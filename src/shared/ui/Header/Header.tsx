import { Logo } from '@shared/assets/logo';
import { Button } from '@shared/ui/Button/Button';
import { headerVariants } from '@shared/ui/Header/Header.variants';
import { UserMenu } from '@shared/ui/Header/UserMenu';
import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';

const { base, rightSection, innerSection, navItem } = headerVariants();

const NAV_ITEMS = [
  { id: 'buy', label: '구매하기' },
  { id: 'sell', label: '판매하기' },
  { id: 'repair', label: '수리점찾기' },
  { id: 'chatbot', label: '챗봇' },
  { id: 'mypage', label: '마이페이지' },
] as const;

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'> &
  VariantProps<typeof headerVariants> & {
    isLoggedIn?: boolean;
    user?: { profileImage?: string; nickname?: string };
    onLoginClick?: () => void;
    onMyPageClick?: () => void;
    onLogoutClick?: () => void;
  };

export const Header = ({
  className,
  isLoggedIn = false,
  user,
  onLoginClick,
  onMyPageClick,
  onLogoutClick,
  ...props
}: HeaderProps) => {
  return (
    <header {...props} className={base({ className })}>
      <Logo />
      <div className={rightSection()}>
        <nav className={innerSection()}>
          {NAV_ITEMS.map((item) => (
            <span key={item.id} className={navItem()}>
              {item.label}
            </span>
          ))}
        </nav>
        {isLoggedIn ? (
          <UserMenu
            profileImage={user?.profileImage}
            nickname={user?.nickname}
            onMyPageClick={onMyPageClick}
            onLogoutClick={onLogoutClick}
          />
        ) : (
          <Button variant="fill" size="auto" onClick={onLoginClick}>
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};
