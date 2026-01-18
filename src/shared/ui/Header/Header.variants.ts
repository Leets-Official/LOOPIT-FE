import { tv } from 'tailwind-variants';

export const headerVariants = tv({
  base: [
    'flex',
    'w-full',
    'max-w-[1440px]',
    'mx-auto',
    'px-[120px] py-[var(--margin-l)]',
    'justify-between',
    'items-center',
    'bg-white',
  ],

  slots: {
    rightSection: ['flex', 'items-center', 'gap-[93px]'],
    innerSection: ['flex', 'items-center', 'gap-[56px]'],
    navItem: ['text-center', 'typo-body-1', 'text-[var(--color-gray-900)]', 'cursor-pointer'],
    userMenuButton: ['flex', 'items-center', 'gap-[6px]', 'cursor-pointer'],
    userMenuIcon: ['text-gray-400', 'transition-transform', 'duration-200'],
    userMenuDropdown: [
      'inline-flex',
      'h-[235px]',
      'p-[17px_32px]',
      'items-center',
      'gap-[10px]',
      'rounded-[var(--radius-m)]',
      'bg-white',
      'shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]',
    ],
    userMenuDropdownInner: ['flex', 'w-[163px]', 'flex-col', 'items-start', 'gap-[45px]'],
    userMenuDropdownInfo: ['flex', 'flex-col', 'items-start', 'gap-[17px]', 'self-stretch'],
    userMenuDropdownName: ['self-stretch', 'typo-body-2', 'text-[var(--color-gray-900)]'],
    userMenuDropdownLink: [
      'self-stretch',
      'typo-caption-1',
      'text-gray-500',
      'cursor-pointer',
      'bg-transparent',
      'border-none',
      'p-0',
      'text-left',
    ],
  },
});
