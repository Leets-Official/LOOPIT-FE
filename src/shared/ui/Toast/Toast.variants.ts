import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  slots: {
    container:
      'flex w-fit max-w-[90vw] flex-col items-center gap-[10px] rounded-(--radius-s) border px-[21px] py-[17px] shadow-[0_4px_4px_0_var(--color-gray-300)]',
    content: 'flex w-full items-center justify-between gap-4 md:gap-[126px]',
    messageWrapper: 'flex min-w-0 items-center gap-[11px]',
    message: 'typo-body-2 whitespace-pre-wrap break-words',
    closeButton: 'shrink-0',
    closeIcon: 'h-6 w-6 text-gray-500 **:stroke-gray-500 **:stroke-2',
    toastIcon: 'h-6 w-6',
  },
  variants: {
    tone: {
      default: {
        container: 'border-gray-600 bg-gray-50',
        message: 'text-gray-900',
      },
      success: {
        container: 'border-green-700 bg-green-50',
        message: 'text-green-700',
        toastIcon: 'text-green-700',
        closeIcon: 'text-green-700 **:stroke-green-700',
      },
      error: {
        container: 'border-[#EF2020] bg-white',
        message: 'text-[#EF2020]',
        toastIcon: 'text-[#EF2020]',
        closeIcon: 'text-[#EF2020] **:stroke-[#EF2020]',
      },
      edit: {
        container: 'border-gray-800 bg-[#F2F2F7]',
        message: 'text-gray-900',
        toastIcon: 'text-gray-800',
        closeIcon: 'text-gray-800 **:stroke-gray-800',
      },
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});
