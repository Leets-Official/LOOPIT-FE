import { SearchMagnifyingGlassIcon } from '@shared/assets/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { searchBarVariants } from './SearchBar.variants';
import type { SearchBarProps, SearchBarState } from './SearchBar.types';

export const SearchBar = ({
  autoFilled = true,
  state: stateProp,
  className,
  value,
  defaultValue,
  onChange,
  ...rest
}: SearchBarProps) => {
  const isControlled = value !== undefined;

  const [innerValue, setInnerValue] = useState<string>(defaultValue ?? '');
  const currentValue = isControlled ? value : innerValue;

  const hasValue = (currentValue ?? '').trim().length > 0;

  const computedState: SearchBarState = autoFilled
    ? hasValue
      ? 'filled'
      : 'default'
    : (stateProp ?? 'default');

  const styles = searchBarVariants({ state: computedState });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) {
      setInnerValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div className={styles.root()}>
      <div className={clsx(styles.wrapper(), className)}>
        <SearchMagnifyingGlassIcon className={styles.icon()} aria-hidden="true" />
        <input value={currentValue} onChange={handleChange} className={styles.input()} {...rest} />
      </div>
    </div>
  );
};

export default SearchBar;
