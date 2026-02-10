import {
  useMyPageBuyHistoryQuery,
  useMyPageProfileQuery,
  useMyPageSellHistoryQuery,
  type TradeHistoryItem,
  type TradeHistoryQueryStatus,
  type TradeHistoryStatus,
} from '@shared/apis/mypage';
import { FAVORITE_PRODUCT_ITEMS, FAVORITE_REPAIR_ITEMS } from '@shared/mocks/data/mypage';
import { useCallback, useMemo, useState } from 'react';
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
  status: item.status === 'COMPLETED' ? 'completed' : 'buying',
  statusLabel: options?.statusLabel,
  imageUrl: item.thumbnailUrl ?? undefined,
});

export const useMyPageState = () => {
  const { data: profileData } = useMyPageProfileQuery();
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<StatusFilter>('all');
  const [sellStatus, setSellStatus] = useState<StatusFilter>('all');
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');
  const [sellStatusOverrides, setSellStatusOverrides] = useState<Record<number, TradeHistoryStatus>>({});

  const mapStatusToQuery = (status: StatusFilter): TradeHistoryQueryStatus => {
    if (status === 'completed') {
      return 'COMPLETED';
    }
    if (status === 'buying') {
      return 'RESERVED';
    }
    return 'ALL';
  };

  const buyStatusQuery = mapStatusToQuery(buyStatus);
  const sellStatusQuery = mapStatusToQuery(sellStatus);

  const { data: buyAllHistory } = useMyPageBuyHistoryQuery('ALL');
  const { data: sellAllHistory } = useMyPageSellHistoryQuery('ALL');
  const { data: buyHistory } = useMyPageBuyHistoryQuery(buyStatusQuery);
  const { data: sellHistory } = useMyPageSellHistoryQuery(sellStatusQuery);

  const buyItemsForCount = useMemo(
    () => (buyAllHistory ?? profileData?.buyList ?? []).map((item) => mapHistoryItem(item)),
    [buyAllHistory, profileData?.buyList]
  );

  const resolveSellStatus = useCallback(
    (item: TradeHistoryItem): TradeHistoryStatus => {
      return sellStatusOverrides[item.postId] ?? item.status;
    },
    [sellStatusOverrides]
  );

  const mapSellHistoryItem = useCallback(
    (item: TradeHistoryItem): TradeListItem => {
      const resolvedStatus = resolveSellStatus(item);
      const mapped = mapHistoryItem(
        {
          ...item,
          status: resolvedStatus,
        },
        { statusLabel: resolvedStatus === 'COMPLETED' ? '판매완료' : '판매중' }
      );
      const uiStatus = resolvedStatus === 'COMPLETED' ? 'completed' : 'buying';
      return {
        ...mapped,
        status: uiStatus,
        statusEditable: true,
        statusOptions: [
          { value: 'buying', label: '판매중' },
          { value: 'completed', label: '판매완료' },
        ],
        onStatusChange: (nextStatus) => {
          const nextHistoryStatus: TradeHistoryStatus = nextStatus === 'completed' ? 'COMPLETED' : 'RESERVED';
          setSellStatusOverrides((prev) => ({
            ...prev,
            [item.postId]: nextHistoryStatus,
          }));
        },
      };
    },
    [resolveSellStatus]
  );

  const sellItemsForCount = useMemo(
    () => (sellAllHistory ?? []).map((item) => mapSellHistoryItem(item)),
    [sellAllHistory, mapSellHistoryItem]
  );

  const buyItems = useMemo(() => {
    const serverItems = buyHistory ?? (buyStatusQuery === 'ALL' ? buyAllHistory : undefined);
    if (buyStatusQuery !== 'ALL' && serverItems && serverItems.length === 0 && buyItemsForCount.length) {
      return filterTradeItems(buyItemsForCount, buyStatus);
    }
    const baseItems = serverItems ?? buyAllHistory ?? profileData?.buyList ?? [];
    return baseItems.map((item) =>
      mapHistoryItem(item, { statusLabel: item.status === 'COMPLETED' ? '구매완료' : '구매중' })
    );
  }, [buyHistory, buyStatusQuery, buyAllHistory, buyItemsForCount, buyStatus, profileData?.buyList]);
  const sellItems = useMemo(() => {
    const serverItems = sellHistory ?? (sellStatusQuery === 'ALL' ? sellAllHistory : undefined);
    if (sellStatusQuery !== 'ALL' && serverItems && serverItems.length === 0 && sellItemsForCount.length) {
      return filterTradeItems(sellItemsForCount, sellStatus);
    }
    const baseItems = serverItems ?? sellAllHistory ?? [];
    return baseItems.map((item) => mapSellHistoryItem(item));
  }, [sellHistory, sellStatusQuery, sellAllHistory, sellItemsForCount, sellStatus, mapSellHistoryItem]);

  const buyStatusTabs = createStatusTabs(buyItemsForCount, { buying: '구매중', completed: '구매완료' });
  const sellStatusTabs = createStatusTabs(sellItemsForCount, { buying: '판매중', completed: '판매완료' });

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
