import { useInfinitePostListQuery, type PriceRangeEnum } from '@shared/apis/post';
import { useDebounce, useInfiniteScroll } from '@shared/hooks';
import { useState } from 'react';
import { filterBuyItems } from './filterBuyItems';
import { MANUFACTURERS, MODELS, PRICE_RANGES } from './filters';

type ChipType = 'manufacturer' | 'model' | 'price';

export type FilterChip = {
  id: string;
  label: string;
  type: ChipType;
};

export const useBuyFilter = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showAllModels, setShowAllModels] = useState(false);

  const priceRangeMap: Record<string, PriceRangeEnum> = {
    'under-100': 'UNDER_10',
    '100-130': 'FROM_10_TO_30',
    '130-160': 'FROM_30_TO_60',
    '160-200': 'FROM_60_TO_90',
    '200+': 'OVER_100',
  };
  const selectedPriceRange = selectedPrices.length === 1 ? (priceRangeMap[selectedPrices[0]] ?? undefined) : undefined;
  const shouldClientManufacturerFilter = selectedManufacturers.length > 0;
  const shouldClientPriceFilter = selectedPrices.length > 0;

  const manufacturerMap: Record<string, string> = {
    apple: 'APPLE',
    samsung: 'SAMSUNG',
  };
  const selectedManufacturer =
    selectedManufacturers.length === 1 ? manufacturerMap[selectedManufacturers[0]] : undefined;

  const selectedSeries = (() => {
    if (selectedModels.length === 0) {
      return undefined;
    }
    return selectedModels.map((id) => {
      const label = MODELS.find((item) => item.id === id)?.label ?? '';
      return label.replace(' 시리즈', '');
    });
  })();

  const keyword = debouncedQuery.trim().length >= 2 ? debouncedQuery.trim() : undefined;

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfinitePostListQuery({
    manufacturer: shouldClientManufacturerFilter ? undefined : selectedManufacturer,
    series: selectedSeries,
    priceRange: shouldClientPriceFilter ? undefined : selectedPriceRange,
    keyword,
  });

  const { observerRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const items = data?.pages.flatMap((page) => page.content) ?? [];

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

  const activeChips: FilterChip[] = [...manufacturerChips, ...modelChips, ...priceChips];

  const filteredItems = filterBuyItems({
    items,
    query: debouncedQuery,
    selectedManufacturers,
    selectedModels,
    selectedPrices,
    skipServerSyncedFilters: true,
    applyManufacturerFilter: shouldClientManufacturerFilter,
    applyPriceFilter: shouldClientPriceFilter,
    applyQueryFilter: debouncedQuery.trim().length > 0,
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
    }
  };

  const resetFilters = () => {
    setSelectedManufacturers([]);
    setSelectedModels([]);
    setSelectedPrices([]);
  };

  return {
    // 검색
    query,
    setQuery,

    // 필터 상태
    selectedManufacturers,
    selectedModels,
    selectedPrices,

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

    // 무한스크롤
    observerRef,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
  };
};
