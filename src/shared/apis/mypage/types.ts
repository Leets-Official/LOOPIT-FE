import type { ApiResponse } from '../types';

export type TradeHistoryStatus = 'RESERVED' | 'COMPLETED';

export type TradeHistoryItem = {
  postId: number;
  thumbnailUrl: string | null;
  title: string;
  price: number;
  status: TradeHistoryStatus;
  createdAt: string;
  updatedAt: string;
};

export type MyPageProfile = {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  buyList: TradeHistoryItem[];
};

export type MyPageProfileResponseBody = ApiResponse<MyPageProfile>;
export type TradeHistoryResponseBody = ApiResponse<TradeHistoryItem[]>;
