import { tv } from 'tailwind-variants';

export const chatInputVariants = tv({
  slots: {
    root: ['flex w-full'],
    wrapper: [
      'flex items-center',
      'w-[1200px] max-w-full min-h-[60px]',
      'px-[22px] py-[11px]',
      'gap-[16px]',
      'rounded-[var(--radius-l)]',
      'border-[1px] border-[var(--color-green-700)]',
      'bg-white',
    ],
    input: [
      'w-full bg-transparent outline-none resize-none',
      'typo-body-1',
      'placeholder:text-[var(--color-gray-400)]',
    ],
    button: ['flex items-center justify-center', 'w-[38px] h-[38px]', 'rounded-full', 'transition-colors', 'shrink-0'],
    icon: ['w-[38px] h-[38px]', '[&_.send-circle]:transition-colors', '[&_.send-arrow]:transition-colors'],
  },

  variants: {
    state: {
      default: {
        input: ['text-[var(--color-gray-500)]'],
      },
      focused: {
        input: ['text-[var(--color-black)]'],
      },
      filled: {
        input: ['text-[var(--color-black)]'],
      },
    },
    sendState: {
      inactive: {
        button: ['cursor-not-allowed'],
        icon: [
          '[&_.send-circle]:fill-white',
          '[&_.send-circle]:stroke-[var(--color-gray-400)]',
          '[&_.send-arrow]:stroke-[var(--color-gray-400)]',
        ],
      },
      active: {
        icon: [
          '[&_.send-circle]:fill-[var(--color-green-500)]',
          '[&_.send-circle]:stroke-[var(--color-black)]',
          '[&_.send-arrow]:stroke-[var(--color-black)]',
        ],
      },
    },
  },

  defaultVariants: {
    state: 'default',
    sendState: 'inactive',
  },
});
