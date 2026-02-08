import { useBuyItemsQuery, type PriceRangeEnum } from '@shared/apis/buy';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from '@shared/mocks/data/buy';
import { useEffect, useState } from 'react';
import { filterBuyItems } from './filterBuyItems';

type ChipType = 'manufacturer' | 'model' | 'price' | 'availability';

export type FilterChip = {
  id: string;
  label: string;
  type: ChipType;
};

export const useBuyFilter = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const priceRangeMap: Record<string, PriceRangeEnum> = {
    'under-100': 'UNDER_10',
    '100-130': 'FROM_10_TO_30',
    '130-160': 'FROM_30_TO_60',
    '160-200': 'FROM_60_TO_90',
    '200+': 'OVER_100',
  };
  const selectedPriceRange =
    selectedPrices.length === 1 ? (priceRangeMap[selectedPrices[0]] ?? undefined) : undefined;
  const shouldClientManufacturerFilter = selectedManufacturers.length > 0;
  const shouldClientPriceFilter = selectedPrices.length > 0;

  const manufacturerMap: Record<string, string> = {
    apple: 'APPLE',
    samsung: 'SAMSUNG',
  };
  const selectedManufacturer =
    selectedManufacturers.length === 1 ? manufacturerMap[selectedManufacturers[0]] : undefined;

  const selectedSeries = (() => {
    if (selectedModels.length !== 1) {
      return undefined;
    }
    const label = MODELS.find((item) => item.id === selectedModels[0])?.label ?? '';
    return label.replace(' 시리즈', '');
  })();

  const keyword = appliedQuery.trim().length >= 2 ? appliedQuery.trim() : undefined;

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedManufacturer, selectedSeries, selectedPriceRange, keyword]);

  const { data, isLoading, isError } = useBuyItemsQuery({
    page: currentPage,
    manufacturer: shouldClientManufacturerFilter ? undefined : selectedManufacturer,
    series: selectedSeries,
    priceRange: shouldClientPriceFilter ? undefined : selectedPriceRange,
    keyword,
  });

  const items = data?.content ?? [];

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

  const activeChips: FilterChip[] = [
    ...manufacturerChips,
    ...modelChips,
    ...priceChips,
    ...availabilityChip,
  ];

  const filteredItems = filterBuyItems({
    items,
    query,
    selectedManufacturers,
    selectedModels,
    selectedPrices,
    availableOnly,
    skipServerSyncedFilters: true,
    applyManufacturerFilter: shouldClientManufacturerFilter,
    applyPriceFilter: shouldClientPriceFilter,
    applyQueryFilter: query.trim().length > 0,
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
    applySearch: () => setAppliedQuery(query),

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

    // api 상태
    isLoading,
    isError,

    // 페이지네이션
    currentPage,
    totalPages: data?.totalPages ?? 0,
    isFirstPage: data?.first ?? true,
    isLastPage: data?.last ?? true,
    setCurrentPage,
  };
};
