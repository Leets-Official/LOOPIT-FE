import type { CommonTabItem } from '@pages/mypage/ui/CommonTabs';
import type { BuyHistoryQueryStatus, SellHistoryQueryStatus } from '@shared/apis/mypage';

export type MainTabId = 'buy' | 'sell' | 'favorite';

export type BuyStatusFilter = BuyHistoryQueryStatus;
export type SellStatusFilter = SellHistoryQueryStatus;

export type FavoriteCategory = 'product' | 'repair';

export type BuyStatusTabs = Array<CommonTabItem<BuyStatusFilter>>;
export type SellStatusTabs = Array<CommonTabItem<SellStatusFilter>>;

export type FavoriteTabs = Array<CommonTabItem<FavoriteCategory>>;
