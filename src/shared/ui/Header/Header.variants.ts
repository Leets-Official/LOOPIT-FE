import { tv } from 'tailwind-variants';

const baseButton = ['bg-transparent', 'cursor-pointer'];

export const headerVariants = tv({
  slots: {
    // Layout
    root: [
      'fixed',
      'top-0',
      'left-0',
      'right-0',
      'z-50',
      'w-full',
      'h-(--header-height)',
      'bg-white',
      'transition-shadow',
      'duration-200',
      'pr-[var(--scrollbar-width)]',
    ],
    inner: [
      'flex',
      'w-full',
      'max-w-[1440px]',
      'mx-auto',
      'h-full',
      'justify-between',
      'items-center',
      'pl-10',
      'pr-10',
      'xl:pl-[120px]',
      'xl:pr-[120px]',
    ],
    logo: ['w-[160px]', 'xl:w-[192px]', 'h-[36px]', 'shrink-0'],

    // Desktop Navigation
    desktopNav: ['hidden', 'xl:flex', 'items-center', 'gap-[93px]'],
    navList: ['flex', 'items-center', 'gap-[56px]'],
    navItem: [...baseButton, 'relative', 'text-center', 'typo-body-1', 'text-gray-900', 'whitespace-nowrap'],

    // Mobile Menu
    mobileMenuWrapper: ['relative', 'flex', 'xl:hidden'],
    mobileMenuButton: ['flex', 'items-center', 'justify-center', 'p-2', 'cursor-pointer'],
    mobileMenuIcon: ['w-6', 'h-6', 'text-gray-900'],
    mobileDropdown: [
      'absolute',
      'right-0',
      'top-full',
      'z-50',
      'mt-2',
      'w-48',
      'rounded-lg',
      'bg-white',
      'py-2',
      'shadow-lg',
      'transition-all',
      'duration-200',
      'ease-out',
      'origin-top',
    ],
    mobileNavItem: [
      ...baseButton,
      'typo-body-2',
      'relative',
      'flex',
      'w-full',
      'items-center',
      'px-4',
      'py-3',
      'text-left',
      'text-gray-900',
      'hover:bg-gray-50',
    ],
    mobileDivider: ['mx-4', 'my-2', 'border-t', 'border-gray-200'],
    mobileAuthSection: ['flex', 'flex-col', 'gap-2', 'px-4', 'py-2'],
    mobileAuthButton: [...baseButton, 'typo-body-2', 'text-left'],
    mobileLoginWrapper: ['px-4', 'py-2'],

    // User Menu
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
    userMenuDropdownName: ['self-stretch', 'typo-body-2', 'text-gray-900'],
    userMenuDropdownLink: [
      ...baseButton,
      'self-stretch',
      'typo-caption-1',
      'text-gray-500',
      'border-none',
      'p-0',
      'text-left',
    ],
  },
  variants: {
    scrolled: {
      true: {
        root: ['shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)]'],
      },
    },
  },
});
