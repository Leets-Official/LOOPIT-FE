import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    /* layout */
    'flex items-center justify-center',
    'h-[44px]',
    'px-xl py-m',
    'gap-xxs',

    /* style */
    'rounded-(--radius-l)',
    'typo-body-1',
    'whitespace-nowrap',
    'transition-colors',
    'focus:outline-none',
    'cursor-pointer',
  ],

  variants: {
    variant: {
      fill: [
        /* default */
        'bg-gray-900 text-white',

        /* hover */
        'hover:bg-gray-500',

        /* focus */
        'focus:bg-gray-600 focus:text-white',

        /* disabled */
        'disabled:bg-gray-200',
        'disabled:text-gray-400',
        'disabled:cursor-not-allowed',
      ],

      outline: [
        /* default */
        'bg-transparent',
        'border-2',
        'border-gray-900',
        'text-gray-900',

        /* hover */
        'hover:border-gray-500',
        'hover:text-gray-500',

        /* focus */
        'focus:border-gray-600',
        'focus:text-gray-600',

        /* disabled */
        'disabled:border-gray-300',
        'disabled:text-gray-400',
        'disabled:cursor-not-allowed',
      ],
      light: [
        /* default */
        'bg-white text-gray-900',

        /* hover */
        'hover:bg-gray-100',

        /* focus */
        'focus:bg-gray-200 focus:text-gray-900',

        /* disabled */
        'disabled:bg-gray-100',
        'disabled:text-gray-400',
        'disabled:cursor-not-allowed',
      ],
      lightOutline: [
        /* default */
        'bg-transparent',
        'border-2',
        'border-white',
        'text-white',

        /* hover */
        'hover:border-gray-200',
        'hover:text-gray-200',

        /* focus */
        'focus:border-gray-300',
        'focus:text-gray-300',

        /* disabled */
        'disabled:border-gray-300',
        'disabled:text-gray-400',
        'disabled:cursor-not-allowed',
      ],
    },

    size: {
      default: ['w-[163px]'],
      auto: ['w-auto'],
      full: ['w-full'],
    },
  },

  defaultVariants: {
    variant: 'fill',
    size: 'default',
  },
});
