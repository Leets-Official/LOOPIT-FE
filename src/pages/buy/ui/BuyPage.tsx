import { useBuyFilter } from '@pages/buy/model/useBuyFilter';
import { BuyFilter } from '@pages/buy/ui/BuyFilter';
import { useBuyAutocompleteQuery } from '@shared/apis/buy';
import { CloseIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '@shared/mocks/data/buy';
import { Card } from '@shared/ui/Card';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { SearchBar } from '@shared/ui/SearchBar';
import { cn } from '@shared/utils/cn';
import { type KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
  return (
    <button
      type="button"
      className="typo-caption-1 flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-white"
      onClick={onRemove}
    >
      <span>{label}</span>
      <CloseIcon className="h-3 w-3" aria-hidden="true" />
    </button>
  );
};

const BuyPage = () => {
  const {
    query,
    setQuery,
    selectedManufacturers,
    selectedModels,
    selectedPrices,
    availableOnly,
    setAvailableOnly,
    showAllModels,
    setShowAllModels,
    activeChips,
    removeChip,
    filteredItems,
    toggleManufacturer,
    toggleModel,
    togglePrice,
    resetFilters,
    isLoading,
    isError,
  } = useBuyFilter();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setActiveIndex(-1);
    }, 250);

    return () => window.clearTimeout(handle);
  }, [query]);

  const { data: suggestions = [] } = useBuyAutocompleteQuery(debouncedQuery);

  const filteredSuggestions = useMemo(() => {
    const normalized = debouncedQuery.trim();
    if (!normalized) {
      return [];
    }
    return suggestions.filter((item) => item.toLowerCase().includes(normalized.toLowerCase()));
  }, [debouncedQuery, suggestions]);

  const showSuggestions = isSearchFocused && filteredSuggestions.length > 0;

  const selectSuggestion = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filteredSuggestions.length - 1 : prev - 1));
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(filteredSuggestions[activeIndex]);
    }
  };

  const showEmpty = filteredItems.length === 0;

  if (isLoading) {
    return <LoadingFallback message="상품을 불러오는 중이에요." />;
  }

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-(--margin-l) md:gap-10 lg:gap-[68px] lg:px-0">
      <div className="relative flex w-full justify-center">
        <SearchBar
          placeholder="어떤 제품을 찾으시나요?"
          onSearch={(value) => setQuery(value)}
          value={query}
          onChange={setQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onKeyDown={handleSearchKeyDown}
        />

        {showSuggestions && (
          <div className="rounded-m absolute top-[calc(100%+8px)] right-0 left-0 z-10 border border-gray-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <ul className="max-h-[240px] overflow-auto py-2">
              {filteredSuggestions.map((item, index) => (
                <li key={item}>
                  <button
                    type="button"
                    className={cn(
                      'typo-body-2 flex w-full items-center px-4 py-2 text-left text-gray-900 hover:bg-gray-50',
                      activeIndex === index && 'bg-gray-50'
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSuggestion(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-[22px]">
        <BuyFilter
          manufacturers={MANUFACTURERS}
          models={MODELS}
          priceRanges={PRICE_RANGES}
          selectedManufacturers={selectedManufacturers}
          selectedModels={selectedModels}
          selectedPrices={selectedPrices}
          availableOnly={availableOnly}
          showAllModels={showAllModels}
          onToggleManufacturer={toggleManufacturer}
          onToggleModel={toggleModel}
          onTogglePrice={togglePrice}
          onSetAvailableOnly={setAvailableOnly}
          onSetShowAllModels={setShowAllModels}
          onReset={resetFilters}
        />

        <section className="flex w-full flex-1 flex-col items-start gap-[17px]">
          <div className="min-h-xxl flex flex-wrap items-start gap-2 self-stretch md:gap-[18px]">
            {activeChips.map((chip) => (
              <FilterChip key={`${chip.type}-${chip.id}`} label={chip.label} onRemove={() => removeChip(chip)} />
            ))}
          </div>

          {isError ? (
            <div className="rounded-m flex min-h-[400px] w-full items-center justify-center bg-gray-50 text-gray-500 lg:min-h-[992px]">
              상품 목록을 불러오지 못했어요.
            </div>
          ) : showEmpty ? (
            <div className="rounded-m flex min-h-[400px] w-full flex-1 items-center justify-center bg-gray-50 text-gray-500 lg:min-h-[992px]">
              관련된 상품이 없어요.
            </div>
          ) : (
            <div className="lg:gap-xl grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
              {filteredItems.map((item) => (
                <Link key={item.id} to={`${ROUTES.BUY}/${item.id}`} className="block focus-visible:outline-none">
                  <Card
                    image={item.image}
                    title={item.title}
                    price={item.priceLabel}
                    date={item.dateLabel}
                    className={cn(!item.available && 'opacity-50')}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BuyPage;
