import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, updateUser, updateUserImage } from './api';
import { userKeys } from './keys';
import type { UpdateUserRequest } from './types';

export const useUserInfo = () => {
  const { accessToken, _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUser,
    enabled: _hasHydrated && Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUserRequest }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useUpdateUserImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, imgUrl }: { userId: number; imgUrl: string }) => updateUserImage(userId, imgUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
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
