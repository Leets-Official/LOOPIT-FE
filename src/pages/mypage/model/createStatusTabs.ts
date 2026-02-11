import { getStatusCount } from './filterTradeItems';
import type { BuyStatusTabs, SellStatusTabs } from './types';
import type { TradeHistoryItem } from '@shared/apis/mypage';

export const createBuyStatusTabs = (items: TradeHistoryItem[]): BuyStatusTabs => [
  { id: 'ALL', label: '전체', count: getStatusCount(items, 'ALL') },
  { id: 'RESERVED', label: '구매중', count: getStatusCount(items, 'RESERVED') },
  { id: 'COMPLETED', label: '구매완료', count: getStatusCount(items, 'COMPLETED') },
];

export const createSellStatusTabs = (items: TradeHistoryItem[]): SellStatusTabs => [
  { id: 'ALL', label: '전체', count: getStatusCount(items, 'ALL') },
  { id: 'SALE', label: '판매중', count: getStatusCount(items, 'SALE') },
  { id: 'RESERVED', label: '예약중', count: getStatusCount(items, 'RESERVED') },
  { id: 'COMPLETED', label: '판매완료', count: getStatusCount(items, 'COMPLETED') },
];
