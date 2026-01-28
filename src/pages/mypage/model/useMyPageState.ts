import { BUY_ITEMS, FAVORITE_PRODUCT_ITEMS, FAVORITE_REPAIR_ITEMS, SELL_ITEMS } from '@shared/mocks/data/mypage';
import { useState } from 'react';
import { createStatusTabs } from './createStatusTabs';
import { filterTradeItems } from './filterTradeItems';
import type { FavoriteCategory, FavoriteTabs, MainTabId, StatusFilter } from './types';

export const useMyPageState = () => {
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<StatusFilter>('all');
  const [sellStatus, setSellStatus] = useState<StatusFilter>('all');
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');

  const buyStatusTabs = createStatusTabs(BUY_ITEMS, { buying: '구매중', completed: '구매완료' });
  const sellStatusTabs = createStatusTabs(SELL_ITEMS, { buying: '판매중', completed: '판매완료' });

  const favoriteTabs: FavoriteTabs = [
    { id: 'product', label: '상품', count: FAVORITE_PRODUCT_ITEMS.length },
    { id: 'repair', label: '수리점', count: FAVORITE_REPAIR_ITEMS.length },
  ];

  const filteredBuyItems = filterTradeItems(BUY_ITEMS, buyStatus);
  const filteredSellItems = filterTradeItems(SELL_ITEMS, sellStatus);

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
    favoriteProductItems: FAVORITE_PRODUCT_ITEMS,
    favoriteRepairItems: FAVORITE_REPAIR_ITEMS,
  };
};
