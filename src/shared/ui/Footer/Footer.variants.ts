import { tv } from 'tailwind-variants';

export const footerVariants = tv({
    slots: {
        root: ['w-full', 'bg-white', 'py-[60px]', 'border-t', 'border-gray-100'],
        inner: ['max-w-[1440px]', 'mx-auto', 'px-5', 'xl:px-[120px]', 'flex', 'flex-col', 'gap-[30px]'],
        logo: ['w-[160px]', 'h-[36px]', 'mb-[10px]'],

        // Information Section
        infoSection: ['flex', 'flex-col', 'gap-2'],
        infoTitle: ['typo-body-2', 'font-bold', 'text-gray-500', 'mb-2'],
        infoRow: ['flex', 'items-center', 'gap-4', 'typo-caption-1', 'text-gray-400'],
        infoLabel: ['font-medium'],
        infoValue: ['font-normal'],

        // Links Section
        linkSection: ['flex', 'flex-wrap', 'items-center', 'gap-x-8', 'gap-y-2', 'mt-[10px]'],
        linkItem: [
            'typo-body-2',
            'text-gray-500',
            'hover:text-gray-900',
            'transition-colors',
            'cursor-pointer',
            'font-medium'
        ],
        boldLink: ['font-bold', 'text-gray-900'],
    },
});
