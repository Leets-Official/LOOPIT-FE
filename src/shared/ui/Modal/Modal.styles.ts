export const modalStyles = {
  container: ['fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center'].join(' '),

  content: [
    'w-full',
    'max-w-[347px]',
    'h-[167px]',
    'flex',
    'flex-col',
    'justify-between',
    'rounded-(--radius-l)',
    'bg-green-500',
    'px-[var(--padding-xxl)]',
    'py-[var(--padding-xl)]',
  ].join(' '),

  textGroup: ['flex', 'flex-col', 'gap-xxs'].join(' '),

  buttonGroup: ['flex', 'gap-3'].join(' '),

  buttonWrapper: ['flex-1'].join(' '),
};
