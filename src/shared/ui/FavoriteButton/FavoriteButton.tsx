import { HeartIcon } from '@shared/assets/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { favoriteButtonVariants } from './FavoriteButton.variants';

export interface FavoriteButtonProps {
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  ariaLabel?: string;
}

export const FavoriteButton = ({
  defaultActive = false,
  onToggle,
  ariaLabel = '찜',
}: FavoriteButtonProps) => {
  const [isActive, setActive] = useState<boolean>(defaultActive);

  const styles = favoriteButtonVariants();

  const handleClick = () => {
    const nextActive = !isActive;
    setActive(nextActive);
    onToggle?.(nextActive);
  };

  const iconStateClassName = clsx(
    isActive ? 'fill-[var(--color-green-300)]' : 'fill-transparent',
    'group-focus-visible:fill-[var(--color-green-300)]',
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
