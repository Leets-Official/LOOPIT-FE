import { HeartIcon } from '@shared/assets/icons';
import { cn } from '@shared/utils/cn';
import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { favoriteButtonVariants } from './FavoriteButton.variants';

export interface FavoriteButtonProps {
  active?: boolean;
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  ariaLabel?: string;
  variant?: 'default' | 'inverse';
  onClick?: ComponentPropsWithoutRef<'button'>['onClick'];
}

export const FavoriteButton = ({
  active,
  defaultActive = false,
  onToggle,
  ariaLabel = '찜',
  variant = 'default',
  onClick,
}: FavoriteButtonProps) => {
  const isControlled = active !== undefined;
  const [internalActive, setInternalActive] = useState<boolean>(defaultActive);
  const isActive = isControlled ? active : internalActive;

  useEffect(() => {
    if (!isControlled) {
      setInternalActive(defaultActive);
    }
  }, [defaultActive, isControlled]);

  const styles = favoriteButtonVariants({ variant });

  const handleClick: ComponentPropsWithoutRef<'button'>['onClick'] = (event) => {
    onClick?.(event);
    const nextActive = !isActive;
    if (!isControlled) {
      setInternalActive(nextActive);
    }
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
