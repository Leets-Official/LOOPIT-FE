import { tv } from 'tailwind-variants';

export const bannerCardVariants = tv({
  base: [
    // Layout
    'group',
    'relative',
    'flex',
    'flex-col',
    'justify-end',
    'items-start',
    // Size
    'w-full',
    'max-w-[427px]',
    'h-[384px]',
    // Spacing
    'px-[var(--padding-xl)]',
    'py-[27px]',
    'gap-[var(--spacing-xxs)]',
    // Style
    'rounded-[var(--radius-xl)]',
    'bg-white',
    'bg-[linear-gradient(0deg,rgba(4,217,181,0)_0%,rgba(0,179,155,0.2)_71.11%)]',
    // Interaction
    'cursor-pointer',
    'outline-none',
  ],

  slots: {
    frame: ['flex', 'flex-col', 'items-start', 'gap-[var(--spacing-xs)]', 'self-stretch', 'h-[330px]'],
    textWrapper: ['relative', 'z-10', 'flex', 'flex-col', 'items-start', 'gap-[var(--spacing-xs)]', 'self-stretch'],
    title: ['typo-title-3', 'text-black'],
    description: ['typo-body-1', 'text-black', 'overflow-hidden', 'text-ellipsis', 'line-clamp-2'],
    imageWrapper: ['absolute', 'right-0', 'bottom-0', 'z-0', 'pointer-events-none'],
    image: [
      'w-[213px]',
      'h-[213px]',
      'object-cover',
      'transition-all',
      'duration-300',
      'group-hover:w-[307px]',
      'group-hover:h-[307px]',
    ],
  },
});
