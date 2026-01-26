import { tv } from 'tailwind-variants';

export const chatPromptListVariants = tv({
  slots: {
    root: ['flex', 'flex-col'],
    list: ['flex', 'flex-wrap', 'gap-[10px]'],
    item: [
      'inline-flex',
      'items-center',
      'justify-center',
      'min-h-[60px]',
      'px-[31px]',
      'py-[18px]',
      'rounded-(--radius-l)',
      'border',
      'typo-body-1',
      'text-center',
      'transition-colors',
      'outline-none',
      'cursor-pointer',
    ],
    text: ['max-w-full', 'whitespace-normal', 'break-words'],
  },

  variants: {
    tone: {
      default: {
        item: ['border-green-700', 'bg-white', 'text-green-700'],
      },
    },
    size: {
      fixed: {
        item: ['w-[285px]'],
      },
      auto: {
        item: ['w-fit', 'min-w-[181px]', 'max-w-[285px]'],
      },
    },
    interaction: {
      interactive: {
        item: [
          '[&:is(:hover,:focus,:focus-visible,:active)]:bg-gray-900',
          '[&:is(:hover,:focus,:focus-visible,:active)]:text-brand-primary',
          '[&:is(:hover,:focus,:focus-visible,:active)]:border-gray-900',
        ],
      },
    },
  },

  defaultVariants: {
    tone: 'default',
    size: 'fixed',
    interaction: 'interactive',
  },
});
