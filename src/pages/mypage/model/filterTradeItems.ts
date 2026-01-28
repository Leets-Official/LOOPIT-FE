import type { StatusFilter } from './types';
import type { TradeListItem } from '@pages/mypage/ui/TradeItemList';

export const filterTradeItems = (items: TradeListItem[], status: StatusFilter): TradeListItem[] => {
  if (status === 'all') {
    return items;
  }
  if (status === 'buying') {
    return items.filter((item) => item.status === 'buying' || item.status === 'reserved');
  }
  return items.filter((item) => item.status === status);
};

export const getStatusCount = (items: TradeListItem[], status: StatusFilter): number => {
  return filterTradeItems(items, status).length;
};
