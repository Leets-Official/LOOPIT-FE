import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: [
      'group',
      'flex',
      'flex-col',
      'items-start',
      'w-[204px]',
      'h-[299px]',
      'gap-[14px]',
      'bg-white',
      'cursor-pointer',
    ],
    imageWrapper: [
      'relative',
      'flex',
      'items-start',
      'gap-[10px]',
      'flex-1',
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
    title: ['h-[48px]', 'self-stretch', 'overflow-hidden', 'line-clamp-2', 'typo-body-1', 'text-black', 'text-left'],
    price: ['self-stretch', 'typo-body-2', 'font-semibold', 'text-black', 'text-left'],
    date: ['self-stretch', 'typo-caption-2', 'font-normal', 'text-black', 'text-left'],
    textWrapper: ['flex', 'flex-col', 'gap-1', 'items-start', 'self-stretch', 'pl-2', 'text-left'],
  },
});
