import { tv } from 'tailwind-variants';

export const favoriteButtonVariants = tv({
  slots: {
    root: ['group', 'inline-flex', 'items-center', 'justify-center', 'w-[44px]', 'h-[44px]', 'transition-colors'],
    icon: ['w-[33px]', 'h-[29.26px]', 'transition-colors', '[--icon-fill-active:var(--color-green-300)]'],
  },

  variants: {
    variant: {
      default: { icon: ['[--icon-stroke:var(--color-black)]'] },
      inverse: { icon: ['[--icon-stroke:var(--color-white)]'] },
    },
  },

  defaultVariants: { variant: 'default' },
});
