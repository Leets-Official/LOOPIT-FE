import { useMyPageProfileQuery, useMyPageSellHistoryQuery, type TradeHistoryStatus } from '@shared/apis/mypage';
import { useWishlistPostListQuery, useWishlistShopListQuery } from '@shared/apis/wishlist';
import { useState } from 'react';
import { createBuyStatusTabs, createSellStatusTabs } from './createStatusTabs';
import { mapBuyHistoryItem, mapSellHistoryItem, mapWishlistPostItem, mapWishlistShopItem } from './mappers';
import type { BuyStatusFilter, FavoriteCategory, FavoriteTabs, MainTabId, SellStatusFilter } from './types';

const BUY_STATUS_MAP: Record<Exclude<BuyStatusFilter, 'ALL'>, TradeHistoryStatus> = {
  RESERVED: 'RESERVED',
  COMPLETED: 'COMPLETED',
};

export const useMyPageState = () => {
  const { data: profileData } = useMyPageProfileQuery();
  const { data: wishlistPosts = [] } = useWishlistPostListQuery();
  const { data: wishlistShops = [] } = useWishlistShopListQuery();
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<BuyStatusFilter>('ALL');
  const [sellStatus, setSellStatus] = useState<SellStatusFilter>('ALL');
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');

  // buyList는 profileData에서 사용 (클라이언트 필터링)
  const buyAllHistory = profileData?.buyList ?? [];

  // sellHistory만 API 호출
  const { data: sellAllHistory = [], isPending: isSellLoading } = useMyPageSellHistoryQuery('ALL');

  // 탭 카운트용 (전체 데이터 기준)
  const buyHistoryForCount = buyAllHistory;
  const sellHistoryForCount = sellAllHistory;

  // 현재 필터에 맞는 아이템들 (클라이언트 필터링)
  const filteredBuyHistory =
    buyStatus === 'ALL' ? buyAllHistory : buyAllHistory.filter((item) => item.status === BUY_STATUS_MAP[buyStatus]);
  const buyItems = filteredBuyHistory.map(mapBuyHistoryItem);

  const filteredSellHistory =
    sellStatus === 'ALL' ? sellAllHistory : sellAllHistory.filter((item) => item.status === sellStatus);
  const sellItems = filteredSellHistory.map(mapSellHistoryItem);

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

  // buyList는 profileData에서 오므로 별도 로딩 없음
  // sellHistory만 로딩 상태 체크
  const isLoading = isSellLoading;

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
