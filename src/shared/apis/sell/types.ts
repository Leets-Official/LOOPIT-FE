import type { ApiResponse } from '../types';

export interface SellPostListItem {
  postId: number;
  title: string;
  price: number;
  imageUrl?: string | null;
  createdAt: string;
  status?: string;
}

export type SellPostListData = SellPostListItem[];
export type SellPostListResponseBody = ApiResponse<SellPostListData>;

export interface SellPostDetailData {
  postId: number;
  title: string;
  price: number;
  manufacturer?: string | null;
  modelName?: string | null;
  colorName?: string | null;
  storageSize?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  productCondition?: 'new' | 'used';
  scratchCondition?: 'scratch' | 'clean';
  screenCondition?: 'broken' | 'clean';
  batteryCondition?: '80plus' | '80minus' | '50minus';
  status?: string;
  createdAt?: string;
}

export type SellPostDetailResponseBody = ApiResponse<SellPostDetailData>;

export interface CreateSellPostRequest {
  title: string;
  manufacturer: string;
  model: string;
  color: string;
  capacity: string;
  price: number;
  description: string;
  imageUrls: string[];
  hasScratch: boolean;
  batteryStatus: 'GREAT' | 'GOOD' | 'BAD';
  screenCracked: boolean;
  used: boolean;
}

export interface CreateSellPostResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateSellPostResponseBody = ApiResponse<CreateSellPostResponse>;

export type UpdateSellPostRequest = Partial<CreateSellPostRequest>;
export type UpdateSellPostResponseBody = ApiResponse<{ id: number }>;

export interface SellPostActionRequest {
  postId: number;
  userId?: number;
}

export type SellPostActionResponseBody = ApiResponse<null>;
