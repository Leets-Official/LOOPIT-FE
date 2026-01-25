import { tv } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    root: ['inline-flex', 'items-center', 'gap-xxs', 'cursor-pointer', 'select-none'],
    box: [
      'flex',
      'items-center',
      'justify-center',
      'w-[20px]',
      'h-[20px]',
      'rounded-[4px]',
      'border',
      'transition-colors',
      'duration-[250ms]',
      'ease-out',
      'bg-transparent',
      'border-gray-300',
    ],
    icon: [
      'w-[14px]',
      'h-[14px]',
      'flex',
      'items-center',
      'justify-center',
      'text-white',
      '[&_path]:stroke-[2px]',
      'hidden',
    ],
    label: ['typo-caption-1', 'text-gray-600'],
  },

  variants: {
    checked: {
      true: {
        box: ['bg-green-600', 'border-green-600'],
        icon: ['block'],
      },
    },
    focus: {
      true: {
        box: ['ring-2', 'ring-green-600', 'ring-offset-2'],
      },
    },
    disabled: {
      true: {
        root: ['cursor-not-allowed'],
        box: ['bg-gray-300', 'border-gray-300'],
        label: ['text-gray-600'],
      },
    },
  },
});
