import { tv } from 'tailwind-variants';

export const profileVariants = tv({
  slots: {
    root: [
      'relative',
      'flex items-center justify-center',
      'overflow-hidden',
      'rounded-full',
      'bg-[var(--color-gray-200)]',
    ],

    image: ['w-full', 'h-full', 'object-cover'],
  },

  variants: {
    size: {
      sm: {
        root: ['w-[44px]', 'h-[44px]'],
      },
      lg: {
        root: ['w-[152px]', 'h-[152px]'],
      },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});
