import {
  useMyPageBuyHistoryQuery,
  useMyPageProfileQuery,
  useMyPageSellHistoryQuery,
  type TradeHistoryItem,
} from '@shared/apis/mypage';
import { FAVORITE_PRODUCT_ITEMS, FAVORITE_REPAIR_ITEMS } from '@shared/mocks/data/mypage';
import { useMemo, useState } from 'react';
import { createStatusTabs } from './createStatusTabs';
import { filterTradeItems } from './filterTradeItems';
import type { FavoriteCategory, FavoriteTabs, MainTabId, StatusFilter } from './types';
import type { TradeListItem } from '@pages/mypage/ui/TradeItemList';

const formatPrice = (value: number) => `${new Intl.NumberFormat('ko-KR').format(value)}원`;
const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const mapHistoryItem = (item: TradeHistoryItem, options?: { statusLabel?: string }): TradeListItem => ({
  id: String(item.postId),
  modelName: item.title,
  price: formatPrice(item.price),
  date: formatDate(item.createdAt),
  status: item.status === 'COMPLETED' ? 'completed' : 'reserved',
  statusLabel: options?.statusLabel,
  imageUrl: item.thumbnailUrl ?? undefined,
});

export const useMyPageState = () => {
  const { data: profileData } = useMyPageProfileQuery();
  const { data: buyHistory } = useMyPageBuyHistoryQuery('ALL');
  const { data: sellHistory } = useMyPageSellHistoryQuery('ALL');
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<StatusFilter>('all');
  const [sellStatus, setSellStatus] = useState<StatusFilter>('all');
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');

  const buyItems = useMemo(() => (buyHistory ?? []).map((item) => mapHistoryItem(item)), [buyHistory]);
  const sellItems = useMemo(
    () =>
      (sellHistory ?? []).map((item) =>
        mapHistoryItem(item, {
          statusLabel: item.status === 'COMPLETED' ? '판매완료' : '판매중',
        })
      ),
    [sellHistory]
  );

  const buyStatusTabs = createStatusTabs(buyItems, { buying: '구매중', completed: '구매완료' });
  const sellStatusTabs = createStatusTabs(sellItems, { buying: '판매중', completed: '판매완료' });

  const favoriteTabs: FavoriteTabs = [
    { id: 'product', label: '상품', count: FAVORITE_PRODUCT_ITEMS.length },
    { id: 'repair', label: '수리점', count: FAVORITE_REPAIR_ITEMS.length },
  ];

  const filteredBuyItems = filterTradeItems(buyItems, buyStatus);
  const filteredSellItems = filterTradeItems(sellItems, sellStatus);

  const currentStatusTabs = activeTab === 'buy' ? buyStatusTabs : sellStatusTabs;
  const currentStatus = activeTab === 'buy' ? buyStatus : sellStatus;
  const currentFilteredItems = activeTab === 'buy' ? filteredBuyItems : filteredSellItems;

  const handleStatusChange = (id: StatusFilter) => {
    if (activeTab === 'buy') {
      setBuyStatus(id);
    } else {
      setSellStatus(id);
    }
  };

  return {
    // Tab state
    activeTab,
    setActiveTab,

    // Status filter state
    buyStatus,
    sellStatus,
    currentStatus,
    handleStatusChange,

    // Favorite state
    favoriteCategory,
    setFavoriteCategory,

    // Tabs data
    buyStatusTabs,
    sellStatusTabs,
    favoriteTabs,
    currentStatusTabs,

    // Filtered items
    filteredBuyItems,
    filteredSellItems,
    currentFilteredItems,

    // Raw data
    profileData,
    buyItems,
    sellItems,
    favoriteProductItems: FAVORITE_PRODUCT_ITEMS,
    favoriteRepairItems: FAVORITE_REPAIR_ITEMS,
  };
};
