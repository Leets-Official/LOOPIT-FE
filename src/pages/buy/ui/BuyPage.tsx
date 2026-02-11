import { useBuyFilter } from '@pages/buy/model/useBuyFilter';
import { BuyFilter } from '@pages/buy/ui/BuyFilter';
import { useBuyAutocompleteQuery } from '@shared/apis/post';
import { CloseIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { useDebounce } from '@shared/hooks';
import { Card, CardSkeleton } from '@shared/ui/Card';
import { EmptyState } from '@shared/ui/EmptyState';
import { SearchBar } from '@shared/ui/SearchBar';
import { cn } from '@shared/utils/cn';
import { type KeyboardEvent, useState } from 'react';
import { Link } from 'react-router';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '../model/filters';

const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
  return (
    <div className="typo-body-2 flex items-center justify-center gap-1.5 rounded-full bg-gray-900 px-3 py-1 text-white">
      <span>{label}</span>
      <button type="button" onClick={onRemove} aria-label={`${label} 필터 제거`}>
        <CloseIcon className="size-6 cursor-pointer text-gray-100" aria-hidden="true" />
      </button>
    </div>
  );
};

const BuyPage = () => {
  const {
    query,
    setQuery,
    selectedManufacturers,
    selectedModels,
    selectedPrices,
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
    observerRef,
    isFetchingNextPage,
  } = useBuyFilter();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSelected, setHasSelected] = useState(false);
  const debouncedQuery = useDebounce(query.trim(), 300);

  const { data: suggestions = [] } = useBuyAutocompleteQuery(debouncedQuery);

  const normalizedQuery = debouncedQuery.trim();
  const filteredSuggestions = normalizedQuery
    ? suggestions.filter((item) => item.toLowerCase().includes(normalizedQuery.toLowerCase()))
    : [];

  const showSuggestions = isSearchFocused && filteredSuggestions.length > 0 && !hasSelected;

  const selectSuggestion = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
    setHasSelected(true);
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

  const showEmpty = !isLoading && filteredItems.length === 0;

  return (
    <main className="md:px-xxxl mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-(--margin-l) md:gap-10 lg:gap-[68px] lg:px-0">
      <div className="flex w-full justify-center">
        <div className="relative w-full max-w-[550px]">
          <SearchBar
            placeholder="어떤 제품을 찾으시나요?"
            value={query}
            onChange={(value) => {
              setQuery(value);
              setHasSelected(false);
            }}
            onSearch={() => {}}
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
      </div>

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-[22px]">
        <BuyFilter
          manufacturers={MANUFACTURERS}
          models={MODELS}
          priceRanges={PRICE_RANGES}
          selectedManufacturers={selectedManufacturers}
          selectedModels={selectedModels}
          selectedPrices={selectedPrices}
          showAllModels={showAllModels}
          onToggleManufacturer={toggleManufacturer}
          onToggleModel={toggleModel}
          onTogglePrice={togglePrice}
          onSetShowAllModels={setShowAllModels}
          onReset={resetFilters}
        />

        <section className="flex w-full flex-1 flex-col items-start gap-[17px]">
          <div className="flex min-h-8 flex-wrap items-start gap-2 self-stretch md:gap-[18px]">
            {activeChips.map((chip) => (
              <FilterChip key={`${chip.type}-${chip.id}`} label={chip.label} onRemove={() => removeChip(chip)} />
            ))}
          </div>

          {isError ? (
            <EmptyState message="상품 목록을 불러오지 못했어요." className="min-h-[400px] lg:min-h-[992px]" />
          ) : isLoading ? (
            <div className="flex min-h-[400px] w-full items-center justify-center lg:min-h-[992px]">
              <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          ) : showEmpty ? (
            <EmptyState message="관련된 상품이 없어요." className="min-h-[400px] flex-1 lg:min-h-[992px]" />
          ) : (
            <>
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
                {isFetchingNextPage &&
                  Array.from({ length: 5 }).map((_, index) => <CardSkeleton key={`skeleton-${index}`} />)}
              </div>
              <div ref={observerRef} className="h-10 w-full" />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default BuyPage;
