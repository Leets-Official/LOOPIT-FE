import { MODELS, PRICE_RANGES } from './filters';
import type { BuyItem } from '@shared/types/buy';

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
  const trimmedQuery = query.trim();

  return items.filter((item) => {
    if (skipServerSyncedFilters) {
      const matchesManufacturer =
        !applyManufacturerFilter || selectedManufacturers.length === 0 || selectedManufacturers.includes(item.brand);
      const matchesQuery = !applyQueryFilter || trimmedQuery.length === 0 || item.title.includes(trimmedQuery);
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
    const matchesQuery = trimmedQuery.length === 0 || item.title.includes(trimmedQuery);

    return matchesManufacturer && matchesModel && matchesPrice && matchesQuery;
  });
};
