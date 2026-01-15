import { tv } from 'tailwind-variants';

export const radioButtonVariants = tv({
  slots: {
    root: ['inline-flex items-center', 'gap-[var(--spacing-xxs)]', 'cursor-pointer', 'select-none'],

    circle: [
      'flex items-center justify-center',
      'w-[20px] h-[20px]',
      'rounded-full',
      'border',
      'border-[var(--color-gray-300)]',
      'transition-colors duration-[250ms] ease-out',
    ],

    dot: [
      'w-[10px] h-[10px]',
      'rounded-full',
      'scale-0',
      'transition-transform duration-[200ms] ease-out',
    ],

    label: ['typo-caption-1', 'text-[var(--color-gray-500)]'],
  },

  variants: {
    checked: {
      true: {
        circle: ['border-[var(--color-green-600)]'],
        dot: ['scale-100', 'bg-[var(--color-green-600)]'],
      },
    },

    focus: {
      true: {
        circle: ['ring-2', 'ring-[var(--color-green-600)]', 'ring-offset-2'],
      },
    },

    disabled: {
      true: {
        root: ['cursor-not-allowed'],
        circle: ['border-[var(--color-gray-300)]'],
        dot: ['scale-100', 'bg-[var(--color-gray-300)]'],
        label: ['text-[var(--color-gray-500)]'],
      },
    },
  },
});
