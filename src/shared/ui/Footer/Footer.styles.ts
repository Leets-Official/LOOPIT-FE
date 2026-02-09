export const footerStyles = {
  root: ['w-full', 'bg-white', 'py-[60px]', 'border-t', 'border-gray-100', 'mt-[168px]'].join(' '),
  inner: ['max-w-[1440px]', 'mx-auto', 'px-5', 'xl:px-[120px]', 'flex', 'flex-col', 'gap-[30px]'].join(' '),
  logo: ['w-[160px]', 'h-[36px]', 'mb-[10px]'].join(' '),

  // Information Section
  infoSection: ['flex', 'flex-col', 'gap-2'].join(' '),
  infoTitle: ['typo-body-2', 'font-bold', 'text-gray-500', 'mb-2'].join(' '),
  infoRow: ['flex', 'flex-wrap', 'items-center', 'gap-x-4', 'gap-y-1', 'typo-caption-1', 'text-gray-400'].join(' '),
  infoLabel: ['font-medium'].join(' '),
  infoValue: ['font-normal'].join(' '),
  separator: ['hidden', 'md:block', 'h-[10px]', 'w-[1px]', 'bg-gray-300'].join(' '),

  // Links Section
  linkSection: ['flex', 'flex-wrap', 'items-center', 'gap-x-8', 'gap-y-2', 'mt-[10px]'].join(' '),
  linkItem: [
    'typo-body-2',
    'text-gray-500',
    'hover:text-gray-900',
    'transition-colors',
    'cursor-pointer',
    'font-medium',
  ].join(' '),
  boldLink: ['font-bold', 'text-gray-900'].join(' '),
};
