import { HeartFilledIcon, HeartIcon } from '@shared/assets/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { favoriteButtonVariants } from './FavoriteButton.variants';

export const FavoriteButton = ({
  defaultActive = false,
  onToggle,
  ariaLabel = '찜',
}: {
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  ariaLabel?: string;
}) => {
  const [isActive, setActive] = useState<boolean>(defaultActive);

  const styles = favoriteButtonVariants();

  const handleClick = () => {
    const nextActive = !isActive;
    setActive(nextActive);
    onToggle?.(nextActive);
  };

  return (
    <button
      type="button"
      className={styles.root()}
      aria-pressed={isActive}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <HeartIcon
        className={clsx(styles.icon(), isActive ? 'hidden' : 'block', 'group-focus-visible:hidden')}
        aria-hidden="true"
      />
      <HeartFilledIcon
        className={clsx(styles.icon(), isActive ? 'block' : 'hidden', 'group-focus-visible:block')}
        aria-hidden="true"
      />
    </button>
  );
};
