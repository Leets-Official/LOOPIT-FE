import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUser, updateUser, updateUserImage } from './api';
import { userKeys } from './keys';
import type { UpdateUserRequest } from './types';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    if (status === 401) {
      return '다시 로그인해주세요.';
    }
    if (status === 404) {
      return '계정 정보를 확인할 수 없습니다. 다시 로그인해주세요.';
    }
  }
  return '정보를 불러오는데 실패했습니다.';
};

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
    errorMessage: error ? getErrorMessage(error) : null,
  };
};
