import { CaretDownMdIcon } from '@shared/assets/icons';
import { Button } from '@shared/ui/Button/Button';
import { headerVariants } from '@shared/ui/Header/Header.variants';
import { Profile } from '@shared/ui/Profile/Profile';
import { useEffect, useRef, useState } from 'react';

const {
  userMenuButton,
  userMenuIcon,
  userMenuDropdown,
  userMenuDropdownInner,
  userMenuDropdownInfo,
  userMenuDropdownName,
  userMenuDropdownLink,
} = headerVariants();

export type UserMenuProps = {
  profileImage?: string;
  nickname?: string;
  onMyPageClick?: () => void;
  onLogoutClick?: () => void;
};

export const UserMenu = ({
  profileImage,
  nickname = '홍길동',
  onMyPageClick,
  onLogoutClick,
}: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={userMenuButton()}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Profile size="sm" image={profileImage} />
        <CaretDownMdIcon className={userMenuIcon({ className: isOpen ? 'rotate-180' : '' })} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="사용자 메뉴"
          className={userMenuDropdown({ className: 'absolute top-full right-0 mt-2' })}
        >
          <div className={userMenuDropdownInner()}>
            <div className={userMenuDropdownInfo()}>
              <span className={userMenuDropdownName()}>{nickname}님</span>
            </div>
            <button
              type="button"
              role="menuitem"
              className={userMenuDropdownLink()}
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
