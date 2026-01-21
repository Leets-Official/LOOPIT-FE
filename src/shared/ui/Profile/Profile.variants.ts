import { tv } from 'tailwind-variants';

export const profileVariants = tv({
  slots: {
    root: ['relative', 'flex items-center justify-center', 'overflow-hidden', 'rounded-full'],

    image: ['w-full', 'h-full', 'object-cover'],

    placeholder: [
      'w-full',
      'h-full',
      'bg-[linear-gradient(45deg,#f2f2f2_25%,transparent_25%),linear-gradient(-45deg,#f2f2f2_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f2f2f2_75%),linear-gradient(-45deg,transparent_75%,#f2f2f2_75%)]',
      'bg-[length:20px_20px]',
      'bg-[position:0_0,0_10px,10px_-10px,-10px_0px]',
    ],
  },

  variants: {
    size: {
      sm: {
        root: ['w-[44px]', 'h-[44px]'],
      },
      lg: {
        root: ['w-[152px]', 'h-[152px]'],
      },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});
