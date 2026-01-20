import { HeartIcon } from '@shared/assets/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { favoriteButtonVariants } from './FavoriteButton.variants';

export interface FavoriteButtonProps {
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  ariaLabel?: string;
  variant?: 'default' | 'inverse';
}

export const FavoriteButton = ({
  defaultActive = false,
  onToggle,
  ariaLabel = '찜',
  variant = 'default',
}: FavoriteButtonProps) => {
  const [isActive, setActive] = useState<boolean>(defaultActive);

  const styles = favoriteButtonVariants({ variant });

  const handleClick = () => {
    const nextActive = !isActive;
    setActive(nextActive);
    onToggle?.(nextActive);
  };

  const iconStateClassName = clsx(
    'fill-[var(--icon-fill)]',
    'stroke-[var(--icon-stroke)]',
    isActive ? '[--icon-fill:var(--icon-fill-active)]' : '[--icon-fill:transparent]',
    'group-focus-visible:[--icon-fill:var(--icon-fill-active)]'
  );

  return (
    <button
      type="button"
      className={styles.root()}
      aria-pressed={isActive}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <HeartIcon className={clsx(styles.icon(), iconStateClassName)} aria-hidden="true" />
    </button>
  );
};
