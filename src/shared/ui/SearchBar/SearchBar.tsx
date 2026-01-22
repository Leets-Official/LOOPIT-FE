import { SearchMagnifyingGlassIcon } from '@shared/assets/icons';
import { useState, type ChangeEventHandler, type KeyboardEventHandler } from 'react';
import { searchBarVariants } from './SearchBar.variants';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar = ({ placeholder, onSearch, value, onChange }: SearchBarProps) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isFocused, setFocused] = useState(false);

  const isControlled = value !== undefined;
  const query = isControlled ? value : internalQuery;
  const isFilled = query.length > 0;

  const styles = searchBarVariants({
    state: isFocused ? (isFilled ? 'filled' : 'focused') : 'default',
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalQuery(newValue);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <search className={styles.root()}>
      <div className={styles.wrapper()} role="search">
        <SearchMagnifyingGlassIcon className={styles.icon()} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          className={styles.input()}
          placeholder={placeholder}
          aria-label={placeholder ?? 'Search'}
          onKeyDown={handleKeyDown}
        />
      </div>
    </search>
  );
};
