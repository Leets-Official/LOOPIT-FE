import { CloseIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '@shared/mocks/data/buy';
import { Card } from '@shared/ui/Card';
import { Checkbox } from '@shared/ui/Checkbox';
import { SearchBar } from '@shared/ui/SearchBar';
import { cn } from '@shared/utils/cn';
import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { getBuyItems } from '../model/buyRepository';
import { filterBuyItems } from '../model/filterBuyItems';

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
      className="flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-[12px] font-semibold text-white"
      onClick={onRemove}
    >
      <span>{label}</span>
      <CloseIcon className="h-3 w-3" aria-hidden="true" />
    </button>
  );
};

export default function BuyPage() {
  const [query, setQuery] = useState('');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const defaultModelCount = 8;

  const activeChips = useMemo(() => {
    const manufacturerChips = selectedManufacturers.map((id) => ({
      id,
      label: MANUFACTURERS.find((item) => item.id === id)?.label ?? id,
      type: 'manufacturer' as const,
    }));
    const modelChips = selectedModels.map((id) => ({
      id,
      label: MODELS.find((item) => item.id === id)?.label ?? id,
      type: 'model' as const,
    }));
    const priceChips = selectedPrices.map((id) => ({
      id,
      label: PRICE_RANGES.find((item) => item.id === id)?.label ?? id,
      type: 'price' as const,
    }));
    const availabilityChip = availableOnly
      ? [
          {
            id: 'available-only',
            label: '구매가능만',
            type: 'availability' as const,
          },
        ]
      : [];
    return [...manufacturerChips, ...modelChips, ...priceChips, ...availabilityChip];
  }, [selectedManufacturers, selectedModels, selectedPrices, availableOnly]);

  const filteredItems = useMemo(
    () =>
      filterBuyItems({
        items: getBuyItems(),
        query,
        selectedManufacturers,
        selectedModels,
        selectedPrices,
        availableOnly,
      }),
    [query, selectedManufacturers, selectedModels, selectedPrices, availableOnly]
  );

  const toggleSelection = (value: string, setter: (next: string[]) => void, state: string[]) => {
    setter(state.includes(value) ? state.filter((item) => item !== value) : [...state, value]);
  };

  const resetFilters = () => {
    // NOTE: API 연동 시 서버/쿼리 스트링 필터 초기화 동기화 필요
    setSelectedManufacturers([]);
    setSelectedModels([]);
    setSelectedPrices([]);
    setAvailableOnly(false);
  };

  const showEmpty = filteredItems.length === 0;

  return (
    <main className="min-h-screen bg-white pb-20" style={{ zoom: 1.1111 }}>
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-10">
        <div className="flex justify-center">
          <SearchBar
            placeholder="어떤 제품을 찾으시나요?"
            onSearch={(value) => setQuery(value)}
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-[22px]">
          <aside className="w-full shrink-0 lg:h-[663px] lg:w-[183px]">
            <div className="flex items-center justify-between">
              <h2 className="typo-body-2 text-gray-900">필터</h2>
              <button type="button" className="text-[12px] font-medium text-gray-400" onClick={resetFilters}>
                초기화
              </button>
            </div>

            <div className="mt-4">
              <Checkbox
                label="구매가능만 보기"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
              />
            </div>

            <div className="mt-4 flex flex-col gap-[21px]">
              <FilterSection title="제조사">
                {MANUFACTURERS.map((item) => (
                  <Checkbox
                    key={item.id}
                    label={item.label}
                    checked={selectedManufacturers.includes(item.id)}
                    onChange={() => toggleSelection(item.id, setSelectedManufacturers, selectedManufacturers)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="모델명">
                {(showAllModels ? MODELS : MODELS.slice(0, defaultModelCount)).map((item) => (
                  <Checkbox
                    key={item.id}
                    label={item.label}
                    checked={selectedModels.includes(item.id)}
                    onChange={() => toggleSelection(item.id, setSelectedModels, selectedModels)}
                  />
                ))}
                <button
                  type="button"
                  className="mt-2 text-left text-[12px] font-semibold text-green-700"
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
                    onChange={() => toggleSelection(item.id, setSelectedPrices, selectedPrices)}
                  />
                ))}
              </FilterSection>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="typo-body-2 text-gray-900">필터</span>
              {activeChips.map((chip) => (
                <FilterChip
                  key={`${chip.type}-${chip.id}`}
                  label={chip.label}
                  onRemove={() => {
                    if (chip.type === 'manufacturer') {
                      setSelectedManufacturers((prev) => prev.filter((item) => item !== chip.id));
                      return;
                    }
                    if (chip.type === 'model') {
                      setSelectedModels((prev) => prev.filter((item) => item !== chip.id));
                      return;
                    }
                    if (chip.type === 'availability') {
                      setAvailableOnly(false);
                      return;
                    }
                    setSelectedPrices((prev) => prev.filter((item) => item !== chip.id));
                  }}
                />
              ))}
            </div>

            <div className="mt-4">
              {showEmpty ? (
                <div className="flex h-[992px] w-full max-w-[1008px] items-center justify-center rounded-[var(--radius-m)] bg-gray-50 text-gray-500">
                  관련된 상품이 없어요.
                </div>
              ) : (
                <div className="grid w-full max-w-[1008px] grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(5,_180px)] lg:gap-[24px]">
                  {filteredItems.map((item) => (
                    <Link key={item.id} to={`${ROUTES.BUY}/${item.id}`} className="block focus-visible:outline-none">
                      <Card
                        image={item.image}
                        title={item.title}
                        price={item.priceLabel}
                        date={item.dateLabel}
                        className={cn('h-[299px] w-[180px]', !item.available && 'opacity-50')}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
