import { tv } from 'tailwind-variants';

export const modalVariants = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/40',

    container:
      'w-[347px] h-[167px] rounded-[var(--radius-l)] bg-[var(--color-green-500)] px-[32px] py-[24px] flex flex-col justify-between',

    textGroup: 'flex flex-col gap-[var(--spacing-xxs)]',

    buttonGroup: 'flex gap-3',

    buttonWrapper: 'flex-1',
  },
});
