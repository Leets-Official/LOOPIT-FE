import { useAuthStore } from '@shared/stores';
import { useQuery } from '@tanstack/react-query';
import {
  getMyPageBuyHistory,
  getMyPageProfile,
  getMyPageSellHistory,
  type BuyHistoryQueryStatus,
  type SellHistoryQueryStatus,
} from './api';
import { mypageKeys } from './keys';

type QueryOptions = {
  enabled?: boolean;
};

export const useMyPageProfileQuery = () => {
  const { _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: mypageKeys.profile(),
    queryFn: getMyPageProfile,
    enabled: _hasHydrated,
  });
};

export const useMyPageBuyHistoryQuery = (status: BuyHistoryQueryStatus = 'ALL', options?: QueryOptions) => {
  const { _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: mypageKeys.buyHistory(status),
    queryFn: () => getMyPageBuyHistory(status),
    enabled: _hasHydrated && (options?.enabled ?? true),
  });
};

export const useMyPageSellHistoryQuery = (status: SellHistoryQueryStatus = 'ALL', options?: QueryOptions) => {
  const { _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: mypageKeys.sellHistory(status),
    queryFn: () => getMyPageSellHistory(status),
    enabled: _hasHydrated && (options?.enabled ?? true),
  });
};
