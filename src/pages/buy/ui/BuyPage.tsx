import { useBuyFilter } from '@pages/buy/model/useBuyFilter';
import { CloseIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '@shared/mocks/data/buy';
import { Card } from '@shared/ui/Card';
import { Checkbox } from '@shared/ui/Checkbox';
import { SearchBar } from '@shared/ui/SearchBar';
import { cn } from '@shared/utils/cn';
import { Link } from 'react-router';
import type { ReactNode } from 'react';

const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-3 pb-4">
      <h3 className="typo-body-2 text-gray-900">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
      <div className="h-px w-full bg-gray-100" />
    </section>
  );
};

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

const DEFAULT_MODEL_COUNT = 8;

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
  } = useBuyFilter();

  const showEmpty = filteredItems.length === 0;

  return (
    <main className="mx-auto flex w-[1200px] flex-col items-center gap-[68px]">
      <SearchBar
        placeholder="어떤 제품을 찾으시나요?"
        onSearch={(value) => setQuery(value)}
        value={query}
        onChange={setQuery}
      />

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-[22px]">
        <aside className="flex w-full shrink-0 flex-col items-start gap-[21px] lg:h-[702px] lg:w-[183px]">
          <div className="flex items-center justify-between self-stretch">
            <h2 className="typo-body-2 text-gray-900">필터</h2>
            <button type="button" className="typo-caption-2 font-medium text-gray-400" onClick={resetFilters}>
              초기화
            </button>
          </div>

          <Checkbox
            label="구매가능만 보기"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />

          <div className="flex flex-col gap-[21px] self-stretch">
            <FilterSection title="제조사">
              {MANUFACTURERS.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  checked={selectedManufacturers.includes(item.id)}
                  onChange={() => toggleManufacturer(item.id)}
                />
              ))}
            </FilterSection>

            <FilterSection title="모델명">
              {(showAllModels ? MODELS : MODELS.slice(0, DEFAULT_MODEL_COUNT)).map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  checked={selectedModels.includes(item.id)}
                  onChange={() => toggleModel(item.id)}
                />
              ))}
              <button
                type="button"
                className="typo-caption-1 mt-2 text-left text-green-700"
                onClick={() => setShowAllModels((prev) => !prev)}
              >
                {showAllModels ? '접기' : '더보기'}
              </button>
            </FilterSection>

            <FilterSection title="가격">
              {PRICE_RANGES.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  checked={selectedPrices.includes(item.id)}
                  onChange={() => togglePrice(item.id)}
                />
              ))}
            </FilterSection>
          </div>
        </aside>

        <section className="flex w-[1008px] flex-col items-start gap-[17px]">
          <div className="min-h-xxl flex items-start gap-[18px] self-stretch">
            {activeChips.map((chip) => (
              <FilterChip key={`${chip.type}-${chip.id}`} label={chip.label} onRemove={() => removeChip(chip)} />
            ))}
          </div>

          {showEmpty ? (
            <div className="rounded-m flex h-[992px] w-full items-center justify-center bg-gray-50 text-gray-500">
              관련된 상품이 없어요.
            </div>
          ) : (
            <div className="lg:gap-xl grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(5,180px)]">
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
