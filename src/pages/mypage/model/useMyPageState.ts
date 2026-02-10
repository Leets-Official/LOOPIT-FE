import { useMyPageBuyHistoryQuery, useMyPageProfileQuery, useMyPageSellHistoryQuery } from '@shared/apis/mypage';
import { useWishlistPostListQuery, useWishlistShopListQuery } from '@shared/apis/wishlist';
import { useState } from 'react';
import { createBuyStatusTabs, createSellStatusTabs } from './createStatusTabs';
import { mapBuyHistoryItem, mapSellHistoryItem, mapWishlistPostItem, mapWishlistShopItem } from './mappers';
import type { BuyStatusFilter, FavoriteCategory, FavoriteTabs, MainTabId, SellStatusFilter } from './types';

export const useMyPageState = () => {
  const { data: profileData } = useMyPageProfileQuery();
  const { data: wishlistPosts = [] } = useWishlistPostListQuery();
  const { data: wishlistShops = [] } = useWishlistShopListQuery();
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<BuyStatusFilter>('ALL');
  const [sellStatus, setSellStatus] = useState<SellStatusFilter>('ALL');
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');

  // ALL 쿼리는 항상 호출 (카운트용)
  const { data: buyAllHistory = [], isPending: isBuyLoading } = useMyPageBuyHistoryQuery('ALL');
  const { data: sellAllHistory = [], isPending: isSellLoading } = useMyPageSellHistoryQuery('ALL');

  // 필터링된 쿼리는 ALL이 아닐 때만 호출
  const { data: buyFilteredHistory } = useMyPageBuyHistoryQuery(buyStatus, {
    enabled: buyStatus !== 'ALL',
  });
  const { data: sellFilteredHistory } = useMyPageSellHistoryQuery(sellStatus, {
    enabled: sellStatus !== 'ALL',
  });

  // 탭 카운트용 (전체 데이터 기준)
  const buyHistoryForCount = buyAllHistory.length > 0 ? buyAllHistory : (profileData?.buyList ?? []);
  const sellHistoryForCount = sellAllHistory;

  // 현재 필터에 맞는 아이템들
  const buyItems =
    buyStatus === 'ALL' ? buyHistoryForCount.map(mapBuyHistoryItem) : (buyFilteredHistory ?? []).map(mapBuyHistoryItem);

  const sellItems =
    sellStatus === 'ALL'
      ? sellHistoryForCount.map(mapSellHistoryItem)
      : (sellFilteredHistory ?? []).map(mapSellHistoryItem);

  const buyStatusTabs = createBuyStatusTabs(buyHistoryForCount);
  const sellStatusTabs = createSellStatusTabs(sellHistoryForCount);

  const favoriteProductItems = wishlistPosts.map(mapWishlistPostItem);
  const favoriteRepairItems = wishlistShops.map((item, index) => mapWishlistShopItem(item, index));

  const favoriteTabs: FavoriteTabs = [
    { id: 'product', label: '상품', count: favoriteProductItems.length },
    { id: 'repair', label: '수리점', count: favoriteRepairItems.length },
  ];

  const handleBuyStatusChange = (id: BuyStatusFilter) => {
    setBuyStatus(id);
  };

  const handleSellStatusChange = (id: SellStatusFilter) => {
    setSellStatus(id);
  };

  const isLoading = isBuyLoading || isSellLoading;

  return {
    // Loading state
    isLoading,

    // Tab state
    activeTab,
    setActiveTab,

    // Status filter state
    buyStatus,
    sellStatus,
    handleBuyStatusChange,
    handleSellStatusChange,

    // Favorite state
    favoriteCategory,
    setFavoriteCategory,

    // Tabs data
    buyStatusTabs,
    sellStatusTabs,
    favoriteTabs,

    // Items
    buyItems,
    sellItems,

    // Raw data
    profileData,
    favoriteProductItems,
    favoriteRepairItems,
  };
};
