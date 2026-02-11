import type { ApiResponse } from '../types';

// Shop wishlist
export interface WishlistShopItem {
  shopName: string;
  location: string;
  phone: string;
}

export interface ToggleShopWishlistRequest {
  shopName: string;
  location: string;
  phone: string;
}

export interface CheckShopWishlistRequest {
  shopNames: string[];
}

export interface ShopWishlistStatus {
  shopName: string;
  shopInWishList: boolean;
}

export type ToggleWishlistResult = 'Enabled' | 'Disabled';

// Post wishlist
export interface WishlistPostItem {
  postId: number;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TogglePostWishlistRequest {
  postId: number;
}

// Response types
export type WishlistShopResponseBody = ApiResponse<WishlistShopItem[]>;
export type WishlistPostResponseBody = ApiResponse<WishlistPostItem[]>;
export type ToggleWishlistResponseBody = ApiResponse<ToggleWishlistResult>;
export type CheckShopWishlistResponseBody = ApiResponse<ShopWishlistStatus[]>;
