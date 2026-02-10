import { axiosInstance } from '../axiosInstance';
import { WISHLIST_ENDPOINTS } from './endpoints';
import type { WishlistPostItem, WishlistPostResponseBody, WishlistShopItem, WishlistShopResponseBody } from './types';

const normalizeWishlistList = <T>(data: unknown): T[] => {
  if (Array.isArray(data)) {
    return data as T[];
  }
  if (data && typeof data === 'object') {
    const maybeRecord = data as Record<string, unknown>;
    if (Array.isArray(maybeRecord.content)) {
      return maybeRecord.content as T[];
    }
    if (Array.isArray(maybeRecord.items)) {
      return maybeRecord.items as T[];
    }
  }
  return [];
};

export const getWishlistShops = async (): Promise<WishlistShopItem[]> => {
  const response = await axiosInstance.get<WishlistShopResponseBody>(WISHLIST_ENDPOINTS.SHOP_LIST);
  return normalizeWishlistList<WishlistShopItem>(response.data.data);
};

export const getWishlistPosts = async (): Promise<WishlistPostItem[]> => {
  const response = await axiosInstance.get<WishlistPostResponseBody>(WISHLIST_ENDPOINTS.POST_LIST);
  return normalizeWishlistList<WishlistPostItem>(response.data.data);
};
