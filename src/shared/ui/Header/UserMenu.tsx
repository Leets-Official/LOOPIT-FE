import { CaretDownMdIcon } from '@shared/assets/icons';
import { useClickOutside } from '@shared/hooks';
import { Button } from '@shared/ui/Button/Button';
import { Profile } from '@shared/ui/Profile/Profile';
import { cn } from '@shared/utils/cn';
import { useRef, useState } from 'react';

export type UserMenuProps = {
  profileImage?: string;
  nickname?: string;
  onMyPageClick?: () => void;
  onLogoutClick?: () => void;
};

export const UserMenu = ({ profileImage, nickname = '홍길동', onMyPageClick, onLogoutClick }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);
  useClickOutside(containerRef, isOpen, closeMenu);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-[6px]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Profile size="sm" image={profileImage} />
        <CaretDownMdIcon className={cn('text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="사용자 메뉴"
          className="rounded-m gap-xxs absolute top-full right-0 mt-2 inline-flex h-[235px] items-center bg-white p-[17px_32px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <div className="flex w-[163px] flex-col items-start gap-[45px]">
            <div className="flex flex-col items-start gap-[17px] self-stretch">
              <span className="typo-body-2 self-stretch text-gray-900">{nickname}님</span>
            </div>
            <button
              type="button"
              role="menuitem"
              className="typo-caption-1 cursor-pointer self-stretch border-none bg-transparent p-0 text-left text-gray-500"
              onClick={onMyPageClick}
            >
              마이페이지
            </button>
            <Button variant="fill" size="full" onClick={onLogoutClick}>
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
