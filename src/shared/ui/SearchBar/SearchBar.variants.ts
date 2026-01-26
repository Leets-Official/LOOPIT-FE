import { tv } from 'tailwind-variants';

export const searchBarVariants = tv({
  slots: {
    root: ['flex', 'flex-col', 'w-full', 'max-w-[550px]'],
    wrapper: [
      'flex',
      'items-center',
      'w-full',
      'h-[44px]',
      'px-[15px]',
      'py-[10px]',
      'gap-[25px]',
      'rounded-m',
      'transition-colors',
    ],
    icon: ['w-[24px]', 'h-[24px]', 'shrink-0', 'transition-colors'],
    input: ['w-full', 'bg-transparent', 'outline-none', 'typo-body-1', 'placeholder:typo-body-1'],
  },

  variants: {
    state: {
      default: {
        wrapper: ['bg-green-100'],
        icon: ['text-gray-500'],
        input: ['text-gray-500', 'placeholder:text-gray-500'],
      },
      filled: {
        wrapper: ['bg-green-300'],
        icon: ['text-black'],
        input: ['text-black', 'placeholder:text-black'],
      },
      focused: {
        wrapper: ['bg-green-300'],
        icon: ['text-black'],
        input: ['text-black'],
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
});
