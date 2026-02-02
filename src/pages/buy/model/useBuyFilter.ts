import { getBuyItems } from '@shared/apis';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '@shared/mocks/data/buy';
import { useState } from 'react';
import { filterBuyItems } from './filterBuyItems';

type ChipType = 'manufacturer' | 'model' | 'price' | 'availability';

export type FilterChip = {
  id: string;
  label: string;
  type: ChipType;
};

export const useBuyFilter = () => {
  const [query, setQuery] = useState('');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);

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
    ? [{ id: 'available-only', label: '구매가능만', type: 'availability' as const }]
    : [];

  const activeChips: FilterChip[] = [...manufacturerChips, ...modelChips, ...priceChips, ...availabilityChip];

  const filteredItems = filterBuyItems({
    items: getBuyItems(),
    query,
    selectedManufacturers,
    selectedModels,
    selectedPrices,
    availableOnly,
  });

  const toggleManufacturer = (id: string) => {
    setSelectedManufacturers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleModel = (id: string) => {
    setSelectedModels((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const togglePrice = (id: string) => {
    setSelectedPrices((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const removeChip = (chip: FilterChip) => {
    switch (chip.type) {
      case 'manufacturer':
        setSelectedManufacturers((prev) => prev.filter((item) => item !== chip.id));
        break;
      case 'model':
        setSelectedModels((prev) => prev.filter((item) => item !== chip.id));
        break;
      case 'price':
        setSelectedPrices((prev) => prev.filter((item) => item !== chip.id));
        break;
      case 'availability':
        setAvailableOnly(false);
        break;
    }
  };

  const resetFilters = () => {
    // NOTE: API 연동 시 서버/쿼리 스트링 필터 초기화 동기화 필요
    setSelectedManufacturers([]);
    setSelectedModels([]);
    setSelectedPrices([]);
    setAvailableOnly(false);
  };

  return {
    // 검색
    query,
    setQuery,

    // 필터 상태
    selectedManufacturers,
    selectedModels,
    selectedPrices,
    availableOnly,
    setAvailableOnly,

    // 모델 더보기
    showAllModels,
    setShowAllModels,

    // 칩
    activeChips,
    removeChip,

    // 필터링된 결과
    filteredItems,

    // 핸들러
    toggleManufacturer,
    toggleModel,
    togglePrice,
    resetFilters,
  };
};
