import { tv } from 'tailwind-variants';

export const profileVariants = tv({
  base: [
    'relative',
    'flex items-center justify-center',
    'overflow-hidden',

    'rounded-full',
    'bg-[var(--color-gray-200)]',
    'bg-center bg-cover bg-no-repeat',
  ],

  variants: {
    size: {
      sm: ['w-[44px]', 'h-[44px]'],
      lg: ['w-[152px]', 'h-[152px]'],
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});
