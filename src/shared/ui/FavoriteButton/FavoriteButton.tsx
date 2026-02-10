import { HeartIcon } from '@shared/assets/icons';
import { cn } from '@shared/utils/cn';
import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { favoriteButtonVariants } from './FavoriteButton.variants';

export interface FavoriteButtonProps {
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  ariaLabel?: string;
  variant?: 'default' | 'inverse';
  onClick?: ComponentPropsWithoutRef<'button'>['onClick'];
}

export const FavoriteButton = ({
  defaultActive = false,
  onToggle,
  ariaLabel = '찜',
  variant = 'default',
  onClick,
}: FavoriteButtonProps) => {
  const [isActive, setActive] = useState<boolean>(defaultActive);

  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  const styles = favoriteButtonVariants({ variant });

  const handleClick: ComponentPropsWithoutRef<'button'>['onClick'] = (event) => {
    onClick?.(event);
    const nextActive = !isActive;
    setActive(nextActive);
    onToggle?.(nextActive);
  };

  const iconStateClassName = cn(
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
      <HeartIcon className={cn(styles.icon(), iconStateClassName)} aria-hidden="true" />
    </button>
  );
};
