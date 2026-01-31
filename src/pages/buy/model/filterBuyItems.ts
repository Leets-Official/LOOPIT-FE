import { PRICE_RANGES } from '@shared/mocks/data/buy';
import type { BuyItem } from '@shared/types/buy';

type FilterParams = {
  items: BuyItem[];
  query: string;
  selectedManufacturers: string[];
  selectedModels: string[];
  selectedPrices: string[];
  availableOnly: boolean;
};

export const filterBuyItems = ({
  items,
  query,
  selectedManufacturers,
  selectedModels,
  selectedPrices,
  availableOnly,
}: FilterParams) => {
  const trimmedQuery = query.trim();

  return items.filter((item) => {
    const matchesManufacturer = selectedManufacturers.length === 0 || selectedManufacturers.includes(item.brand);
    const matchesModel = selectedModels.length === 0 || selectedModels.includes(item.model);
    const matchesPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some((priceId) => {
        const range = PRICE_RANGES.find((price) => price.id === priceId);
        if (!range) {
          return false;
        }
        return item.priceValue >= range.min && item.priceValue < range.max;
      });
    const matchesAvailability = !availableOnly || item.available;
    const matchesQuery = trimmedQuery.length === 0 || item.title.includes(trimmedQuery);

    return matchesManufacturer && matchesModel && matchesPrice && matchesAvailability && matchesQuery;
  });
};
