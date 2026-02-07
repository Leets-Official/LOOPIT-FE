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

// TEMP: 등록/수정 응답 공통 타입
export type CreateSellPostResponseBody = ApiResponse<CreateSellPostResponse>;
export type UpdateSellPostRequest = Partial<CreateSellPostRequest>;
export type UpdateSellPostResponseBody = ApiResponse<{ id: number }>;
