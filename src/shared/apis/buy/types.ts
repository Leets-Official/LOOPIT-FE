import type { ApiResponse } from '../types';

export interface BuyPostApiSeller {
  nickname?: string;
  profileImage?: string;
}

export interface BuyPostApiSpecs {
  manufacturer?: string;
  model?: string;
  color?: string;
  storage?: string;
  battery?: string;
}

export type PriceRangeEnum = 'UNDER_10' | 'FROM_10_TO_30' | 'FROM_30_TO_60' | 'FROM_60_TO_90' | 'OVER_100';

export interface BuyListCondition {
  manufacturer?: string;
  series?: string[];
  priceRange?: PriceRangeEnum;
  keyword?: string;
}

export interface BuyListParams extends BuyListCondition {
  page?: number;
}

export interface SimilarPost {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuyPostApiItem {
  id?: number | string;
  title?: string;
  price?: number | string;
  manufacturer?: string;
  model?: string;
  color?: string;
  capacity?: string;
  content?: string;
  imageUrls?: string[];
  thumbnail?: string;
  hasScratch?: boolean;
  batteryStatus?: string;
  screenCracked?: boolean;
  used?: boolean;
  status?: string;
  postStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  sellerNickname?: string;
  sellerProfileImage?: string;
  seller?: BuyPostApiSeller;
  brand?: string;
  specs?: BuyPostApiSpecs;
  similarPosts?: SimilarPost[];
  liked?: boolean;
  owner?: boolean;
}

export interface BuyListPage<T> {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
  content: T[];
}

export type BuyListResponseBody = ApiResponse<BuyListPage<BuyPostApiItem>>;
export type BuyDetailResponseBody = ApiResponse<BuyPostApiItem>;
export type BuyAutocompleteResponseBody = ApiResponse<string[]>;

export interface TogglePostWishlistRequest {
  postId: number;
}

export type TogglePostWishlistResult = 'Enabled' | 'Disabled';
export type TogglePostWishlistResponseBody = ApiResponse<TogglePostWishlistResult>;
