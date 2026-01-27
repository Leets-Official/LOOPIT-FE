import type { CommonTabItem } from '@pages/mypage/ui/CommonTabs';
import type { TradeListItem } from '@pages/mypage/ui/TradeItemList';

export type MainTabId = 'buy' | 'sell' | 'favorite';

export type StatusFilter = 'all' | 'buying' | 'completed';

export type FavoriteCategory = 'product' | 'repair';

export type StatusTabLabels = {
  buying: string;
  completed: string;
};

export type CreateStatusTabsParams = {
  items: TradeListItem[];
  labels: StatusTabLabels;
};

export type StatusTabs = Array<CommonTabItem<StatusFilter>>;

export type FavoriteTabs = Array<CommonTabItem<FavoriteCategory>>;
