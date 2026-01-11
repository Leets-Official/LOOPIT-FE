import { tv } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    root: [
      'inline-flex items-center',
      'gap-[var(--spacing-xxs)]',
      'cursor-pointer',
      'select-none',
    ],

    box: [
      'flex items-center justify-center',
      'w-[20px] h-[20px]',
      'rounded-[4px]',
      'border',
      'transition-colors duration-[250ms] ease-out',
    ],

    icon: [
      'w-[14px] h-[14px]',
      'flex items-center justify-center',
      'text-[var(--color-white)]', 
    ],

    label: [
      'typo-caption-1',
      'text-[var(--color-gray-600)]',
    ],
  },

  variants: {
    checked: {
      false: {
        box: [
          'bg-transparent',
          'border-[var(--color-gray-300)]', 
        ],
        icon: ['hidden'],
      },

      true: {
        box: [
          'bg-[var(--color-green-600)]', 
          'border-[var(--color-green-600)]',
        ],
        icon: ['block'],
      },
    },

    focus: {
      true: {
        box: [
          'ring-2',
          'ring-[var(--color-green-600)]',
          'ring-offset-2',
        ],
      },
    },

    disabled: {
      true: {
        root: ['cursor-not-allowed'],
        box: [
          'bg-[var(--color-gray-300)]',
          'border-[var(--color-gray-300)]',
        ],
        label: [
          'text-[var(--color-gray-600)]',
          'line-through',
        ],
      },
    },
  },

  defaultVariants: {
    checked: false,
    focus: false,
    disabled: false,
  },
});
