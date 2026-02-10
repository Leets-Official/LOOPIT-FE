import { useQuery } from '@tanstack/react-query';
import { getMyPageBuyHistory, getMyPageProfile, getMyPageSellHistory, type TradeHistoryQueryStatus } from './api';
import { mypageKeys } from './keys';

export const useMyPageProfileQuery = () => {
  return useQuery({
    queryKey: mypageKeys.profile(),
    queryFn: getMyPageProfile,
  });
};

export const useMyPageBuyHistoryQuery = (status: TradeHistoryQueryStatus = 'ALL') => {
  return useQuery({
    queryKey: mypageKeys.buyHistory(status),
    queryFn: () => getMyPageBuyHistory(status),
  });
};

export const useMyPageSellHistoryQuery = (status: TradeHistoryQueryStatus = 'ALL') => {
  return useQuery({
    queryKey: mypageKeys.sellHistory(status),
    queryFn: () => getMyPageSellHistory(status),
  });
};
