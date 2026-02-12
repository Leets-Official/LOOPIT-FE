import { MODELS, PRICE_RANGES } from './filters';
import type { BuyItem } from '@shared/types/post';

type FilterParams = {
  items: BuyItem[];
  query: string;
  selectedManufacturers: string[];
  selectedModels: string[];
  selectedPrices: string[];
  skipServerSyncedFilters?: boolean;
  applyManufacturerFilter?: boolean;
  applyPriceFilter?: boolean;
  applyQueryFilter?: boolean;
};

export const filterBuyItems = ({
  items,
  query,
  selectedManufacturers,
  selectedModels,
  selectedPrices,
  skipServerSyncedFilters = false,
  applyManufacturerFilter = false,
  applyPriceFilter = false,
  applyQueryFilter = false,
}: FilterParams) => {
  const normalizeQuery = (value: string) =>
    value
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  const compactQuery = (value: string) => normalizeQuery(value).replace(/\s+/g, '');
  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeQuery(query);
  const compactedQuery = compactQuery(query);

  return items.filter((item) => {
    if (skipServerSyncedFilters) {
      const matchesManufacturer =
        !applyManufacturerFilter || selectedManufacturers.length === 0 || selectedManufacturers.includes(item.brand);
      const matchesQuery =
        !applyQueryFilter ||
        trimmedQuery.length === 0 ||
        normalizeQuery(item.title).includes(normalizedQuery) ||
        normalizeQuery(item.model).includes(normalizedQuery) ||
        compactQuery(item.title).includes(compactedQuery) ||
        compactQuery(item.model).includes(compactedQuery);
      if (!applyPriceFilter) {
        return matchesManufacturer && matchesQuery;
      }
      const matchesPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some((priceId) => {
          const range = PRICE_RANGES.find((price) => price.id === priceId);
          if (!range) {
            return false;
          }
          return item.priceValue >= range.min && item.priceValue < range.max;
        });
      return matchesManufacturer && matchesPrice && matchesQuery;
    }

    const matchesManufacturer = selectedManufacturers.length === 0 || selectedManufacturers.includes(item.brand);
    const matchesModel =
      selectedModels.length === 0 ||
      selectedModels.some((id) => {
        const label = MODELS.find((m) => m.id === id)?.label;
        return label && item.model.startsWith(label);
      });
    const matchesPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some((priceId) => {
        const range = PRICE_RANGES.find((price) => price.id === priceId);
        if (!range) {
          return false;
        }
        return item.priceValue >= range.min && item.priceValue < range.max;
      });
    const matchesQuery =
      trimmedQuery.length === 0 ||
      normalizeQuery(item.title).includes(normalizedQuery) ||
      normalizeQuery(item.model).includes(normalizedQuery) ||
      compactQuery(item.title).includes(compactedQuery) ||
      compactQuery(item.model).includes(compactedQuery);

    return matchesManufacturer && matchesModel && matchesPrice && matchesQuery;
  });
};
