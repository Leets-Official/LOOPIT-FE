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

export interface BuyListParams {
  page?: number;
  manufacturer?: string;
  series?: string;
  priceRange?: PriceRangeEnum;
  keyword?: string;
}

export interface BuyPostApiItem {
  id?: number | string;
  postId?: number | string;
  title?: string;
  price?: number | string;
  createdAt?: string;
  date?: string;
  imageUrl?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  brand?: string;
  manufacturer?: string;
  model?: string;
  modelName?: string;
  available?: boolean;
  status?: string;
  condition?: string;
  productCondition?: string;
  scratch?: string;
  scratchCondition?: string;
  screenCrack?: string;
  screenCondition?: string;
  battery?: string;
  batteryCondition?: string;
  seller?: BuyPostApiSeller;
  sellerNickname?: string;
  sellerProfileImage?: string;
  specs?: BuyPostApiSpecs;
  colorName?: string;
  storageSize?: string;
  description?: string | string[];
}

export interface BuyListPage {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
  content: BuyPostApiItem[];
}

export type BuyListResponseBody = ApiResponse<BuyListPage>;
export type BuyDetailResponseBody = ApiResponse<BuyPostApiItem>;
export type BuyAutocompleteResponseBody = ApiResponse<string[]>;
