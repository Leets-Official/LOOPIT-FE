import { axiosInstance } from '../axiosInstance';
import { REPAIR_ENDPOINTS } from './endpoints';
import type {
  CheckShopWishlistRequest,
  CheckShopWishlistResponseBody,
  ShopWishlistStatus,
  ToggleShopWishlistRequest,
  ToggleShopWishlistResponseBody,
  ToggleShopWishlistResult,
} from './types';

export const toggleShopWishlist = async (request: ToggleShopWishlistRequest): Promise<ToggleShopWishlistResult> => {
  const response = await axiosInstance.post<ToggleShopWishlistResponseBody>(REPAIR_ENDPOINTS.WISHLIST_TOGGLE, request);
  return response.data.data;
};

export const checkShopWishlist = async (request: CheckShopWishlistRequest): Promise<ShopWishlistStatus[]> => {
  const response = await axiosInstance.post<CheckShopWishlistResponseBody>(REPAIR_ENDPOINTS.WISHLIST_CHECK, request);
  return response.data.data;
};
