import { BUY_ITEMS } from '@shared/mocks/data/buy';

// NOTE: API 연동 후 mocks → 서버 데이터로 교체 예정
export const getBuyItems = () => BUY_ITEMS;

// NOTE: API 연동 후 단건 조회 API로 교체 예정
export const getBuyItemById = (id?: string) => {
  if (!id) {
    return undefined;
  }
  return BUY_ITEMS.find((entry) => entry.id === id);
};
