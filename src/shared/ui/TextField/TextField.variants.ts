import { tv } from 'tailwind-variants';

export const textFieldVariants = tv({
  slots: {
    root: ['flex flex-col'],

    labelRow: ['flex items-center justify-between'],

    label: [
      // Caption 1 / Medium
      'text-[14px] leading-[20px] font-medium',
      'text-[var(--color-gray-700)]',
      'mb-[12px]',
    ],

    counter: [
      // Caption 2 / Regular
      'text-[12px] leading-[16px] font-normal',
      'text-[var(--color-gray-500)]',
    ],

    fieldWrapper: ['relative'],

    input: [
      'w-[509px] h-[48px]',
      'px-[16px] py-[12px]',
      'rounded-[8px]',
      'border',
      'border-[var(--color-gray-200)]',
      'bg-white',
      'text-[16px] leading-[24px] font-medium',
      'text-[var(--color-gray-900)]',
      'placeholder:text-[var(--color-gray-300)]',
      'hover:border-[var(--color-green-700)]',
      'focus:border-[var(--color-green-700)]',
      'focus:outline-none',
      'transition-colors',
    ],

    textarea: [
      'w-[509px] min-h-[48px]',
      'px-[16px] py-[12px]',
      'rounded-[8px]',
      'border',
      'border-[var(--color-gray-200)]',
      'bg-white',
      'resize-none',
      'text-[16px] leading-[24px] font-medium',
      'placeholder:text-[var(--color-gray-300)]',
      'hover:border-[var(--color-green-700)]',
      'focus:border-[var(--color-green-700)]',
      'focus:outline-none',
      'transition-colors',
    ],

    helperText: [
      // Caption 2
      'mt-[8px]',
      'text-[12px] leading-[16px] font-normal',
      'text-[var(--color-gray-500)]',
    ],

    suffix: [
      'absolute right-[12px] top-1/2 -translate-y-1/2',
      'text-[16px] leading-[24px] font-medium',
      'text-[var(--color-gray-400)]',
      'pointer-events-none',
    ],
  },

  variants: {
    char: {
      true: {
        counter: [
          'absolute top-[4px] right-[8px]',
          'text-[12px] leading-[16px] font-normal',
          'text-[var(--color-gray-500)]',
        ],
      },
    },

    error: {
      true: {
        input: [
          'border-[var(--color-red-500)]',
          'hover:border-[var(--color-red-500)]',
          'focus:border-[var(--color-red-500)]',
        ],
        textarea: [
          'border-[var(--color-red-500)]',
          'hover:border-[var(--color-red-500)]',
          'focus:border-[var(--color-red-500)]',
        ],
        helperText: ['text-[var(--color-red-500)]'],
      },
    },

    disabled: {
      true: {
        input: [
          'bg-[var(--color-gray-100)]',
          'text-[var(--color-gray-300)]',
          'border-[var(--color-gray-200)]',
          'cursor-not-allowed',
        ],
        textarea: [
          'bg-[var(--color-gray-100)]',
          'text-[var(--color-gray-300)]',
          'border-[var(--color-gray-200)]',
          'cursor-not-allowed',
        ],
        label: ['text-[var(--color-gray-300)]'],
        counter: ['text-[var(--color-gray-300)]'],
        helperText: ['text-[var(--color-gray-300)]'],
        suffix: ['text-[var(--color-gray-300)]'],
      },
    },
  },
});
