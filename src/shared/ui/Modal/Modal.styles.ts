export const modalStyles = {
  container: [
    'fixed',
    'inset-0',
    'z-50',
    'w-full',
    'h-full',
    'flex',
    'items-center',
    'justify-center',
    'bg-[rgba(0,0,0,0.30)]',
  ].join(' '),

  content: [
    'w-[347px]',
    'relative',
    'flex',
    'flex-col',
    'gap-xl',
    'rounded-(--radius-l)',
    'bg-white',
    'px-xxl',
    'py-xl',
  ].join(' '),

  textGroup: ['flex', 'flex-col', 'gap-xxs'].join(' '),

  buttonGroup: ['flex', 'gap-3'].join(' '),

  buttonWrapper: ['flex-1'].join(' '),
};
