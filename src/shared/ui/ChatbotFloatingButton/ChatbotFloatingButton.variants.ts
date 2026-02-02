import { tv } from 'tailwind-variants';

export const chatbotFloatingButtonVariants = tv({
  slots: {
    root: [
      'group flex flex-col justify-center items-center',
      'w-[80px] h-[80px]',
      'rounded-full',
      'bg-gray-50',
      'shadow-[0_4px_4px_0_var(--color-gray-100)]',
      'py-[9px] px-[8px]',
      'overflow-hidden',
      'transition-[width,background-color,box-shadow] duration-200 ease-out',
      'hover:py-[9px] hover:pl-[8px] hover:pr-[19px]',
      'focus-visible:py-[9px] focus-visible:pl-[8px] focus-visible:pr-[19px]',
      'hover:w-[182px] hover:bg-gray-200',
      'focus-visible:w-[182px] focus-visible:bg-gray-200',
    ],
    content: [
      'flex items-center justify-center w-full h-full',
      'gap-0 transition-[gap] duration-200 ease-out',
      'group-hover:justify-center group-focus-visible:justify-center',
      'group-hover:gap-[8px] group-focus-visible:gap-[8px]',
      'group-hover:w-[144px] group-focus-visible:w-[144px]',
    ],
    icon: ['w-[47px] h-[38px] shrink-0'],
    label: [
      'typo-title-3 text-black whitespace-nowrap',
      'opacity-0 max-w-0 translate-x-2',
      'transition-[opacity,transform,max-width] duration-200 ease-out',
      'group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-0',
      'group-focus-visible:opacity-100 group-focus-visible:max-w-[120px] group-focus-visible:translate-x-0',
    ],
  },
});
