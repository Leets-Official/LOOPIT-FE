import { Logo } from '@shared/assets/logo';
import { Button } from '@shared/ui/Button/Button';
import { headerVariants } from '@shared/ui/Header/Header.variants';
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
  VariantProps<typeof headerVariants>;

export const Header = ({ className, ...props }: HeaderProps) => {
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
        <Button variant="fill" size="auto">
          로그인
        </Button>
      </div>
    </header>
  );
};
