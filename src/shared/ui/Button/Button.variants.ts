import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    /* layout */
    'flex items-center justify-center',
    'w-[163px] h-[44px]',
    'px-[var(--spacing-xl)] py-[var(--padding-m)]',
    'gap-[var(--spacing-xxs)]',

    /* style */
    'rounded-[var(--radius-l)]',
    'typo-body-1',
    'transition-colors',
    'focus:outline-none',
  ],

  variants: {
    variant: {
      fill: [
        /* default */
        'bg-[var(--color-gray-900)] text-[var(--color-white)]',

        /* hover */
        'hover:bg-[var(--color-gray-500)]',

        /* focus */
        'focus:bg-[var(--color-gray-600)] focus:text-[var(--color-white)]',

        /* disabled */
        'disabled:bg-[var(--color-gray-200)]',
        'disabled:text-[var(--color-gray-400)]',
        'disabled:cursor-not-allowed',
      ],

      outline: [
        /* default */
        'bg-transparent',
        'border-2',
        'border-[var(--color-gray-900)]',
        'text-[var(--color-gray-900)]',

        /* hover */
        'hover:border-[var(--color-gray-500)]',
        'hover:text-[var(--color-gray-500)]',

        /* focus */
        'focus:border-[var(--color-gray-600)]',
        'focus:text-[var(--color-gray-600)]',

        /* disabled */
        'disabled:border-[var(--color-gray-300)]',
        'disabled:text-[var(--color-gray-400)]',
        'disabled:cursor-not-allowed',
      ],
    },
  },

  defaultVariants: {
    variant: 'fill',
  },
});
