import type { ApiResponse } from '../types';

export interface ToggleShopWishlistRequest {
  shopName: string;
  location: string;
}

export type ToggleShopWishlistResult = 'Enabled' | 'Disabled';
export type ToggleShopWishlistResponseBody = ApiResponse<ToggleShopWishlistResult>;

export interface CheckShopWishlistRequest {
  shopNames: string[];
}

export interface ShopWishlistStatus {
  shopName: string;
  shopInWishList: boolean;
}

export type CheckShopWishlistResponseBody = ApiResponse<ShopWishlistStatus[]>;
