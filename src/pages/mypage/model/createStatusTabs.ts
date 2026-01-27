import { getStatusCount } from './filterTradeItems';
import type { StatusTabLabels, StatusTabs } from './types';
import type { TradeListItem } from '@pages/mypage/ui/TradeItemList';

export const createStatusTabs = (items: TradeListItem[], labels: StatusTabLabels): StatusTabs => [
  { id: 'all', label: '전체', count: getStatusCount(items, 'all') },
  { id: 'buying', label: labels.buying, count: getStatusCount(items, 'buying') },
  { id: 'completed', label: labels.completed, count: getStatusCount(items, 'completed') },
];
