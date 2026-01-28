import { tv } from 'tailwind-variants';

export const chatBubbleVariants = tv({
  slots: {
    root: ['flex w-full items-end gap-[10px]'],
    bubble: [
      'inline-flex',
      'items-center',
      'justify-start',
      'min-h-[60px]',
      'px-[31px]',
      'py-[18px]',
      'rounded-(--radius-l)',
      'max-w-[720px]',
    ],
    text: ['typo-body-1', 'whitespace-pre-wrap', 'break-words'],
    meta: ['typo-caption-2', 'text-gray-400'],
  },

  variants: {
    variant: {
      receiver: {
        root: ['justify-start'],
        bubble: ['bg-gray-100'],
        text: ['text-gray-900'],
        meta: ['order-last'],
      },
      sender: {
        root: ['justify-end', 'flex-row-reverse'],
        bubble: ['bg-brand-primary'],
        text: ['text-gray-900'],
        meta: ['order-last'],
      },
      chatbotNotice: {
        root: ['justify-start'],
        bubble: ['bg-gray-100', 'pb-[45px]'],
        text: ['text-gray-900', 'whitespace-pre-line', 'break-keep'],
        meta: ['order-last'],
      },
    },
  },

  defaultVariants: {
    variant: 'receiver',
  },
});
