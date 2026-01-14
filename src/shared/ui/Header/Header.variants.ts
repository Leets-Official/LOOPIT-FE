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
  },
});
