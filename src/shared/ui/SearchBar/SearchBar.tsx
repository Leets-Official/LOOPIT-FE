import { SearchMagnifyingGlassIcon } from '@shared/assets/icons';
import clsx from 'clsx';
import { useState, type KeyboardEventHandler } from 'react';
import { searchBarVariants } from './SearchBar.variants';

export const SearchBar = ({
  placeholder,
  onSearch,
}: {
  placeholder?: string;
  onSearch: (query: string) => void;
}) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);

  const isFilled = query.length > 0;

  const styles = searchBarVariants({
    state: isFocused ? (isFilled ? 'filled' : 'focused') : 'default',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className={styles.root()}>
      <div className={clsx(styles.wrapper())}>
        <SearchMagnifyingGlassIcon className={styles.icon()} aria-hidden="true" />
        <input
          value={query}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          className={styles.input()}
          placeholder={placeholder}
          aria-label={placeholder ?? 'Search'}
          onKeyDown={handleEnterKey}
        />
      </div>
    </div>
  );
};
