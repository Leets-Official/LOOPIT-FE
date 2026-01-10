import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: [
    'flex items-center justify-center',
    'h-[44px]',
    'px-[24px]',
    'py-[--padding-m]',
    'gap-[--spacing-xxs]',
    'rounded-[--radius-l]',
    'typo-body-1',
    'transition-colors',
  ],
  variants: {
    variant: {
      fill: ['bg-gray-900 text-white'],
      outline: ['border-2 border-gray-900 text-gray-900'],
    },
  },
  defaultVariants: {
    variant: 'fill',
  },
});
