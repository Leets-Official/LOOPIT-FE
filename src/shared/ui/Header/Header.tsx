import { Logo } from '@shared/assets/logo';
import { Button } from '@shared/ui/Button/Button';
import { UserMenu } from '@shared/ui/Header/UserMenu';
import { cn } from '@shared/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

const NAV_ITEMS = [
  { id: 'buy', label: '구매하기' },
  { id: 'sell', label: '판매하기' },
  { id: 'repair', label: '수리점찾기' },
  { id: 'chatbot', label: '챗봇' },
  { id: 'mypage', label: '마이페이지' },
] as const;

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'> & {
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
    <header
      {...props}
      className={cn(
        'mx-auto flex w-full max-w-[1440px] items-center justify-between bg-white px-[120px] py-(--margin-l)',
        className
      )}
    >
      <Logo />
      <div className="flex items-center gap-[93px]">
        <nav className="flex items-center gap-[56px]">
          {NAV_ITEMS.map((item) => (
            <span key={item.id} className="typo-body-1 cursor-pointer text-center text-gray-900">
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
