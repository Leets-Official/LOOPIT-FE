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
    'h-[167px]',
    'flex',
    'flex-col',
    'justify-between',
    'rounded-[var(--radius-l)]',
    'bg-[var(--color-white)]',
    'px-[var(--padding-xxl)]',
    'py-[var(--padding-xl)]',
  ].join(' '),

  textGroup: ['flex', 'flex-col', 'gap-[var(--spacing-xxs)]'].join(' '),

  buttonGroup: ['flex', 'gap-3'].join(' '),

  buttonWrapper: ['flex-1'].join(' '),
};
