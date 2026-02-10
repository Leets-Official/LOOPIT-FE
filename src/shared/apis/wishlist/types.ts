import type { ApiResponse } from '../types';

export interface WishlistShopItem {
  shopName: string;
  location: string;
}

export interface WishlistPostItem {
  postId?: number;
  id?: number | string;
  title?: string;
  price?: number;
  thumbnailUrl?: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type WishlistShopResponseBody = ApiResponse<WishlistShopItem[]>;
export type WishlistPostResponseBody = ApiResponse<WishlistPostItem[]>;
