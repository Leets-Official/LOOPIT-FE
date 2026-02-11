import { axiosInstance } from '../axiosInstance';
import { MYPAGE_ENDPOINTS } from './endpoints';
import type { MyPageProfile, MyPageProfileResponseBody, TradeHistoryItem, TradeHistoryResponseBody } from './types';

export type BuyHistoryQueryStatus = 'RESERVED' | 'COMPLETED' | 'ALL';
export type SellHistoryQueryStatus = 'SALE' | 'RESERVED' | 'COMPLETED' | 'ALL';

export const getMyPageProfile = async (): Promise<MyPageProfile> => {
  const response = await axiosInstance.get<MyPageProfileResponseBody>(MYPAGE_ENDPOINTS.PROFILE);
  return response.data.data;
};

export const getMyPageBuyHistory = async (status: BuyHistoryQueryStatus = 'ALL'): Promise<TradeHistoryItem[]> => {
  const response = await axiosInstance.get<TradeHistoryResponseBody>(
    MYPAGE_ENDPOINTS.BUY_HISTORY,
    status === 'ALL' ? undefined : { params: { status } }
  );
  const data = response.data.data;
  return Array.isArray(data) ? data : [];
};

export const getMyPageSellHistory = async (status: SellHistoryQueryStatus = 'ALL'): Promise<TradeHistoryItem[]> => {
  const response = await axiosInstance.get<TradeHistoryResponseBody>(
    MYPAGE_ENDPOINTS.SELL_HISTORY,
    status === 'ALL' ? undefined : { params: { status } }
  );
  const data = response.data.data;
  return Array.isArray(data) ? data : [];
};
