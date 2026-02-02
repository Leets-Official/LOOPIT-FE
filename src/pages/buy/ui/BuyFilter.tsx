import { Checkbox } from '@shared/ui/Checkbox';
import { cn } from '@shared/utils/cn';
import { useState, type ReactNode } from 'react';

const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-3 pb-4">
      <h3 className="typo-body-2 text-gray-900">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
      <div className="h-px w-full bg-gray-100" />
    </section>
  );
};

type FilterItem = {
  id: string;
  label: string;
};

export type BuyFilterProps = {
  manufacturers: FilterItem[];
  models: FilterItem[];
  priceRanges: FilterItem[];
  selectedManufacturers: string[];
  selectedModels: string[];
  selectedPrices: string[];
  availableOnly: boolean;
  showAllModels: boolean;
  onToggleManufacturer: (id: string) => void;
  onToggleModel: (id: string) => void;
  onTogglePrice: (id: string) => void;
  onSetAvailableOnly: (value: boolean) => void;
  onSetShowAllModels: (value: boolean) => void;
  onReset: () => void;
  defaultModelCount?: number;
};

export const BuyFilter = ({
  manufacturers,
  models,
  priceRanges,
  selectedManufacturers,
  selectedModels,
  selectedPrices,
  availableOnly,
  showAllModels,
  onToggleManufacturer,
  onToggleModel,
  onTogglePrice,
  onSetAvailableOnly,
  onSetShowAllModels,
  onReset,
  defaultModelCount = 8,
}: BuyFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="flex w-full shrink-0 flex-col items-start gap-[21px] lg:h-[702px] lg:w-[183px]">
      {/* 모바일: 토글 버튼 */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between self-stretch lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="typo-body-2 text-gray-900">필터</h2>
        <span className={cn('typo-caption-2 transition-transform', isOpen && 'rotate-180')}>▼</span>
      </button>

      {/* 데스크탑: 기존 헤더 */}
      <div className="hidden items-center justify-between self-stretch lg:flex">
        <h2 className="typo-body-2 text-gray-900">필터</h2>
        <button type="button" className="typo-caption-2 font-medium text-gray-400" onClick={onReset}>
          초기화
        </button>
      </div>

      {/* 모바일: 토글 콘텐츠 / 데스크탑: 항상 표시 */}
      <div className={cn('w-full flex-col gap-[21px] lg:flex', isOpen ? 'flex' : 'hidden')}>
        {/* 모바일용 초기화 버튼 */}
        <div className="flex items-center justify-end self-stretch lg:hidden">
          <button type="button" className="typo-caption-2 font-medium text-gray-400" onClick={onReset}>
            초기화
          </button>
        </div>

        <Checkbox
          label="구매가능만 보기"
          checked={availableOnly}
          onChange={(e) => onSetAvailableOnly(e.target.checked)}
        />

        <div className="flex flex-col gap-[21px] self-stretch">
          <FilterSection title="제조사">
            {manufacturers.map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={selectedManufacturers.includes(item.id)}
                onChange={() => onToggleManufacturer(item.id)}
              />
            ))}
          </FilterSection>

          <FilterSection title="모델명">
            {(showAllModels ? models : models.slice(0, defaultModelCount)).map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={selectedModels.includes(item.id)}
                onChange={() => onToggleModel(item.id)}
              />
            ))}
            <button
              type="button"
              className="typo-caption-1 mt-2 text-left text-green-700"
              onClick={() => onSetShowAllModels(!showAllModels)}
            >
              {showAllModels ? '접기' : '더보기'}
            </button>
          </FilterSection>

          <FilterSection title="가격">
            {priceRanges.map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={selectedPrices.includes(item.id)}
                onChange={() => onTogglePrice(item.id)}
              />
            ))}
          </FilterSection>
        </div>
      </div>
    </aside>
  );
};
