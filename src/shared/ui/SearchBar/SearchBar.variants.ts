import { tv } from 'tailwind-variants';

export const searchBarVariants = tv({
  slots: {
    root: ['flex flex-col'],
    wrapper: [
      'flex items-center',
      'w-[550px] h-[44px]',
      'px-[15px] py-[10px]',
      'gap-[25px]',
      'rounded-[var(--radius-m)]',
      'transition-colors',
    ],
    icon: ['w-[24px] h-[24px] shrink-0', 'transition-colors'],
    input: ['w-full bg-transparent outline-none', 'typo-body-1', 'placeholder:typo-body-1'],
  },

  variants: {
    state: {
      default: {
        wrapper: ['bg-[var(--color-green-100)]'],
        icon: ['text-[var(--color-gray-500)]'],
        input: ['text-[var(--color-gray-500)]', 'placeholder:text-[var(--color-gray-500)]'],
      },
      filled: {
        wrapper: ['bg-[var(--color-green-300)]'],
        icon: ['text-[var(--color-black)]'],
        input: ['text-[var(--color-black)]', 'placeholder:text-[var(--color-black)]'],
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
});
