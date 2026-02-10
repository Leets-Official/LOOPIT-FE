import { axiosInstance } from '../axiosInstance';
import { MYPAGE_ENDPOINTS } from './endpoints';
import type { MyPageProfile, MyPageProfileResponseBody, TradeHistoryItem, TradeHistoryResponseBody } from './types';

export type TradeHistoryQueryStatus = 'RESERVED' | 'COMPLETED' | 'ALL';

export const getMyPageProfile = async (): Promise<MyPageProfile> => {
  const response = await axiosInstance.get<MyPageProfileResponseBody>(MYPAGE_ENDPOINTS.PROFILE);
  return response.data.data;
};

export const getMyPageBuyHistory = async (status: TradeHistoryQueryStatus = 'ALL'): Promise<TradeHistoryItem[]> => {
  const response = await axiosInstance.get<TradeHistoryResponseBody>(
    MYPAGE_ENDPOINTS.BUY_HISTORY,
    status === 'ALL' ? undefined : { params: { status } }
  );
  const data = response.data.data;
  return Array.isArray(data) ? data : [];
};

export const getMyPageSellHistory = async (status: TradeHistoryQueryStatus = 'ALL'): Promise<TradeHistoryItem[]> => {
  const response = await axiosInstance.get<TradeHistoryResponseBody>(
    MYPAGE_ENDPOINTS.SELL_HISTORY,
    status === 'ALL' ? undefined : { params: { status } }
  );
  const data = response.data.data;
  return Array.isArray(data) ? data : [];
};
