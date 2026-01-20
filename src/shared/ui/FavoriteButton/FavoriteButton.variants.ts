import { tv } from 'tailwind-variants';

export const favoriteButtonVariants = tv({
  slots: {
    root: ['group inline-flex items-center justify-center', 'w-[44px] h-[44px]', 'transition-colors'],
    icon: ['w-[33px] h-[29.26px]', 'text-[var(--color-black)]', 'transition-colors'],
  },
});
