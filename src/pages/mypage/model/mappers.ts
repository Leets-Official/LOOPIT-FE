import { formatDate, formatPrice } from '@shared/utils';
import type { TradeListItem } from '@pages/mypage/ui/TradeItemList';
import type { TradeHistoryItem } from '@shared/apis/mypage';
import type { WishlistPostItem, WishlistShopItem } from '@shared/apis/wishlist';
import type { ShopCardProps } from '@shared/ui/ShopCard';

const mapTradeStatus = (status: TradeHistoryItem['status']) => {
  if (status === 'COMPLETED') {
    return 'completed' as const;
  }
  if (status === 'RESERVED') {
    return 'reserved' as const;
  }
  // SALE → active (판매중/구매중)
  return 'active' as const;
};

export const mapHistoryItem = (item: TradeHistoryItem, options?: { statusLabel?: string }): TradeListItem => ({
  id: String(item.postId),
  modelName: item.title,
  price: formatPrice(item.price),
  date: formatDate(item.createdAt),
  status: mapTradeStatus(item.status),
  statusLabel: options?.statusLabel,
  imageUrl: item.thumbnailUrl ?? undefined,
});

const getBuyStatusLabel = (status: TradeHistoryItem['status']) => {
  if (status === 'COMPLETED') {
    return '구매완료';
  }
  if (status === 'RESERVED') {
    return '예약중';
  }
  return '구매중';
};

const getSellStatusLabel = (status: TradeHistoryItem['status']) => {
  if (status === 'COMPLETED') {
    return '판매완료';
  }
  if (status === 'RESERVED') {
    return '예약중';
  }
  return '판매중';
};

export const mapBuyHistoryItem = (item: TradeHistoryItem): TradeListItem =>
  mapHistoryItem(item, { statusLabel: getBuyStatusLabel(item.status) });

export const mapSellHistoryItem = (item: TradeHistoryItem): TradeListItem =>
  mapHistoryItem(item, { statusLabel: getSellStatusLabel(item.status) });

export const mapWishlistPostItem = (item: WishlistPostItem): TradeListItem => ({
  id: String(item.postId),
  modelName: item.title,
  price: formatPrice(item.price),
  date: formatDate(item.createdAt),
  status: 'favorite',
  favoriteActive: true,
  imageUrl: item.imageUrl,
});

export type WishlistShopCardItem = Pick<ShopCardProps, 'name' | 'address' | 'favoriteActive'> & { id: string };

export const mapWishlistShopItem = (item: WishlistShopItem, index: number): WishlistShopCardItem => ({
  id: `${item.shopName}-${index}`,
  name: item.shopName,
  address: item.location,
  favoriteActive: true,
});
