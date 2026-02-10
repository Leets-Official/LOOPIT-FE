import { axiosInstance } from '../axiosInstance';
import { WISHLIST_ENDPOINTS } from './endpoints';
import type {
  CheckShopWishlistRequest,
  CheckShopWishlistResponseBody,
  ShopWishlistStatus,
  TogglePostWishlistRequest,
  ToggleShopWishlistRequest,
  ToggleWishlistResponseBody,
  ToggleWishlistResult,
  WishlistPostItem,
  WishlistPostResponseBody,
  WishlistShopItem,
  WishlistShopResponseBody,
} from './types';

// 수리점 위시리스트
export const getWishlistShops = async (): Promise<WishlistShopItem[]> => {
  const response = await axiosInstance.get<WishlistShopResponseBody>(WISHLIST_ENDPOINTS.SHOP_LIST);
  return response.data.data;
};

export const toggleShopWishlist = async (request: ToggleShopWishlistRequest): Promise<ToggleWishlistResult> => {
  const response = await axiosInstance.post<ToggleWishlistResponseBody>(WISHLIST_ENDPOINTS.SHOP_TOGGLE, request);
  return response.data.data;
};

export const checkShopWishlist = async (request: CheckShopWishlistRequest): Promise<ShopWishlistStatus[]> => {
  const response = await axiosInstance.post<CheckShopWishlistResponseBody>(WISHLIST_ENDPOINTS.SHOP_CHECK, request);
  return response.data.data;
};

// 게시글 위시리스트
export const getWishlistPosts = async (): Promise<WishlistPostItem[]> => {
  const response = await axiosInstance.get<WishlistPostResponseBody>(WISHLIST_ENDPOINTS.POST_LIST);
  return response.data.data;
};

export const togglePostWishlist = async (request: TogglePostWishlistRequest): Promise<ToggleWishlistResult> => {
  const response = await axiosInstance.post<ToggleWishlistResponseBody>(WISHLIST_ENDPOINTS.POST_TOGGLE, request);
  return response.data.data;
};
