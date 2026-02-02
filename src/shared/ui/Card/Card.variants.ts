import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: ['group', 'flex', 'flex-col', 'items-center', 'gap-[14px]', 'bg-white', 'cursor-pointer'],
    imageWrapper: [
      'relative',
      'flex',
      'items-start',
      'gap-[10px]',
      'self-stretch',
      'rounded-[var(--radius-l)]',
      'overflow-hidden',
    ],
    image: ['w-full', 'h-full', 'object-cover', 'rounded-[var(--radius-l)]'],
    overlay: [
      'absolute',
      'inset-0',
      'rounded-[var(--radius-l)]',
      'bg-white/20',
      'opacity-0',
      'transition-opacity',
      'pointer-events-none',
      'group-hover:opacity-100',
    ],
    title: ['h-[48px]', 'self-stretch', 'overflow-hidden', 'typo-body-1'],
    price: ['self-stretch', 'typo-body-2', 'font-semibold'],
    date: ['self-stretch', 'typo-caption-2', 'font-normal'],
    textWrapper: ['flex', 'flex-col', 'gap-1'],
  },

  variants: {
    variant: {
      default: {
        root: ['w-full', 'h-auto', 'lg:w-[180px]', 'lg:h-[299px]'],
        imageWrapper: ['py-[10px]', 'px-[var(--padding-s)]', 'aspect-square', 'lg:aspect-auto', 'lg:flex-[1_0_0]'],
        image: ['absolute', 'inset-0'],
        title: ['line-clamp-2', 'text-gray-900'],
        price: ['text-gray-900'],
        date: ['text-gray-500'],
        textWrapper: ['items-start', 'self-stretch', 'px-[var(--padding-s)]'],
      },
      seller: {
        root: ['w-[282px]', 'h-[399px]', 'shrink-0'],
        imageWrapper: ['py-[10px]', 'px-[var(--padding-s)]', 'flex-[1_0_0]', 'bg-gray-300'],
        image: ['absolute', 'inset-0'],
        title: ['text-ellipsis', 'whitespace-nowrap', 'text-gray-900'],
        price: ['text-gray-900'],
        date: ['text-gray-500'],
        textWrapper: ['items-start', 'self-stretch', 'px-[var(--padding-s)]'],
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});
