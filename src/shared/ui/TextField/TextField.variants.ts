import { tv } from 'tailwind-variants';

export const textFieldVariants = tv({
  slots: {
    root: ['flex flex-col'],

    labelRow: ['flex items-center justify-between', 'mb-[12px]'],

    label: [
      // Caption 1 / Medium
      'text-[14px] leading-[20px] font-medium',
      'text-[var(--color-gray-700)]',
    ],

    counter: [
      // Caption 2 / Regular
      'text-[12px] leading-[16px] font-normal',
      'text-[var(--color-gray-500)]',
    ],

    fieldWrapper: ['relative'],

    fieldBase: [
      'px-[16px] py-[12px]',
      'rounded-[8px]',
      'border',
      'border-[var(--color-gray-200)]',
      'bg-white',
      'text-[16px] leading-[24px] font-medium',
      'placeholder:text-[var(--color-gray-300)]',

      // disabled 상태에서 hover/focus가 적용되지 않도록 enabled: 사용
      'enabled:hover:border-[var(--color-green-700)]',
      'enabled:focus:border-[var(--color-green-700)]',
      'focus:outline-none',
      'transition-colors',

      // disabled 공통 스타일 (input/textarea 둘 다 적용되도록 fieldBase에 둠)
      'disabled:bg-[var(--color-gray-100)]',
      'disabled:text-[var(--color-gray-300)]',
      'disabled:border-[var(--color-gray-200)]',
      'disabled:cursor-not-allowed',
    ],

    // input: ['w-[509px] h-[48px]'],
    input: ['w-full h-[48px]'],

    textarea: [
      // 'w-[509px] min-h-[48px]',
      'w-full min-h-[48px]',
      'resize-none',
      'overflow-y-auto',
      'max-h-[240px]', // 최대 높이 10줄로 설정
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
    filled: {
      true: {
        input: ['border-[var(--color-green-700)]'],
        textarea: ['border-[var(--color-green-700)]'],
      },
    },

    error: {
      true: {
        input: [
          'border-[var(--color-red-500)]',
          'enabled:hover:border-[var(--color-red-500)]',
          'enabled:focus:border-[var(--color-red-500)]',
        ],
        textarea: [
          'border-[var(--color-red-500)]',
          'enabled:hover:border-[var(--color-red-500)]',
          'enabled:focus:border-[var(--color-red-500)]',
        ],
        helperText: ['text-[var(--color-red-500)]'],
      },
    },

    disabled: {
      true: {
        label: ['text-[var(--color-gray-300)]'],
        counter: ['text-[var(--color-gray-300)]'],
        helperText: ['text-[var(--color-gray-300)]'],
        suffix: ['text-[var(--color-gray-300)]'],
      },
    },

    price: {
      true: {
        input: ['text-right', 'pr-[30px]'],
      },
    },

    date: {
      true: {
        fieldBase: ['text-left', 'text-[var(--color-gray-500)]', 'placeholder:text-[var(--color-gray-500)]'],
      },
    },
  },

  compoundVariants: [
    {
      date: true,
      filled: true,
      disabled: false,
      class: {
        fieldBase: ['text-[var(--color-gray-900)]'],
      },
    },
    {
      date: true,
      error: true,
      disabled: false,
      class: {
        fieldBase: ['text-[var(--color-gray-900)]'],
      },
    },
  ],
});
