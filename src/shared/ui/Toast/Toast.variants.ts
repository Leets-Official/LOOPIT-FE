import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    container:
      'flex w-fit max-w-[90vw] flex-col items-center gap-[10px] rounded-(--radius-s) border px-[21px] py-[17px] shadow-[0_4px_4px_0_var(--color-gray-300)]',
    content: 'flex w-full items-center justify-between gap-[126px]',
    messageWrapper: 'flex min-w-0 items-center gap-[11px]',
    message: 'typo-body-2 whitespace-pre-wrap break-words text-gray-900',
    closeButton: 'shrink-0',
    closeIcon: 'h-6 w-6 text-gray-500 **:stroke-gray-500 **:stroke-2',
    toastIcon: 'h-6 w-6',
  },
  variants: {
    tone: {
      default: {
        container: 'border-gray-600 bg-gray-50',
      },
      success: {
        container: 'border-green-700 bg-green-50',
      },
      error: {
        container: 'border-gray-600 bg-gray-50',
      },
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});
