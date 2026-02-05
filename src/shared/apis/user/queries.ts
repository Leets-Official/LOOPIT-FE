import { useAuthStore } from '@shared/stores';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';
import { userKeys } from './keys';

export const useUserInfo = () => {
  const { userId, accessToken, _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: userKeys.detail(userId!),
    queryFn: () => getUser(userId!),
    enabled: _hasHydrated && Boolean(userId) && Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useAuth = () => {
  const { _hasHydrated } = useAuthStore();
  const { data, isLoading, error } = useUserInfo();

  return {
    user: data ?? null,
    isLoggedIn: Boolean(data),
    isLoading: !_hasHydrated || isLoading,
    error,
  };
};
