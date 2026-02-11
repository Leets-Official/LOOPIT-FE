import type { TradeHistoryItem, TradeHistoryStatus } from '@shared/apis/mypage';

export const getStatusCount = (items: TradeHistoryItem[], status: TradeHistoryStatus | 'ALL'): number => {
  if (status === 'ALL') {
    return items.length;
  }
  return items.filter((item) => item.status === status).length;
};
