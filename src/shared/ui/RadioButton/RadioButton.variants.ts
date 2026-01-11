import { tv } from 'tailwind-variants';

export const radioButtonVariants = tv({
  slots: {
    root: [
      'inline-flex items-center',
      'gap-[var(--spacing-xxs)]', 
      'cursor-pointer',
      'select-none',
    ],

    circle: [
      'flex items-center justify-center',
      'w-[20px] h-[20px]',
      'rounded-full', 
      'border',
    ],

    dot: [
      'w-[10px] h-[10px]',
      'rounded-full',
    ],

    label: [
      'typo-caption-1', 
      'text-[var(--color-gray-500)]', 
    ],
  },

  variants: {
    checked: {
      false: {
        circle: [
          'border-[var(--color-gray-300)]', 
        ],
        dot: ['hidden'],
      },

      true: {
        circle: [
          'border-[var(--color-green-600)]', 
        ],
        dot: [
          'block',
          'bg-[var(--color-green-600)]',
        ],
      },
    },

    disabled: {
      true: {
        root: ['cursor-not-allowed'],
        circle: [
          'border-[var(--color-gray-300)]',
        ],
        dot: [
          'bg-[var(--color-gray-300)]',
        ],
        label: [
          'text-[var(--color-gray-500)]',
          'line-through',
        ],
      },
    },
  },

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});
