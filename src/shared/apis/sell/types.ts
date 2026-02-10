import type { ApiResponse } from '../types';
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
export type UpdateSellPostRequest = CreateSellPostRequest;
export type UpdateSellPostResponseBody = ApiResponse<{ id: number }>;
export type SellAutocompleteResponseBody = ApiResponse<string[]>;

// Status change types
export type SellPostStatus = 'RESERVED' | 'SOLD' | 'ACTIVE';

export interface ReservePostRequest {
  buyerId: number;
  postId: number;
}

export interface CompletePostRequest {
  postId: number;
  buyerId: number;
}

export interface ActivePostRequest {
  postId: number;
}

export interface PostStatusResponse {
  postId: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  status: SellPostStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReservePostResponseBody = ApiResponse<PostStatusResponse>;
export type CompletePostResponseBody = ApiResponse<PostStatusResponse>;
export type ActivePostResponseBody = ApiResponse<PostStatusResponse>;
