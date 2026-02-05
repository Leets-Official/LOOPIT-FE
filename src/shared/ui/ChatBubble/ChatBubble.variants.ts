import { tv } from 'tailwind-variants';

export const chatBubbleVariants = tv({
  slots: {
    root: ['flex w-full items-end gap-[10px] self-stretch'],
    bubble: [
      'inline-flex',
      'items-center',
      'justify-start',
      'min-h-[60px]',
      'px-[31px]',
      'py-[18px]',
      'rounded-[var(--radius-l)]',
      'max-w-full',
      'xl:max-w-[559px]',
    ],
    text: ['typo-body-1', 'whitespace-pre-wrap', 'break-words'],
    meta: ['typo-caption-2', 'text-gray-400'],
  },

  variants: {
    variant: {
      receiver: {
        root: ['justify-start', 'pl-[20px]'],
        bubble: ['bg-gray-100'],
        text: ['text-gray-900'],
        meta: ['order-last'],
      },
      sender: {
        root: ['justify-start', 'flex-row-reverse', 'pr-[23px]'],
        bubble: ['bg-brand-primary'],
        text: ['text-gray-900'],
        meta: ['order-last'],
      },
      chatbotNotice: {
        root: ['justify-start'],
        bubble: ['bg-gray-100', 'max-w-full', 'xl:max-w-[720px]'],
        text: ['text-gray-900', 'whitespace-pre-line', 'break-keep'],
        meta: ['order-last'],
      },
    },
  },

  defaultVariants: {
    variant: 'receiver',
  },
});
