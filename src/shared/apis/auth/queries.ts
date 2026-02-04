import { useAuthStore } from '@shared/stores';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getKakaoLogin, postKakaoRegister, postLogout } from './api';
import { userKeys } from '../user/keys';
import type { KakaoLoginRequest, KakaoLoginResponse, KakaoRegisterRequest, KakaoRegisterResponse } from './types';

export const useKakaoLoginMutation = () => {
  return useMutation<KakaoLoginResponse, Error, KakaoLoginRequest>({
    mutationFn: getKakaoLogin,
  });
};

export const useKakaoRegisterMutation = () => {
  return useMutation<KakaoRegisterResponse, Error, KakaoRegisterRequest>({
    mutationFn: postKakaoRegister,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  const cleanup = () => {
    clearAuth();
    queryClient.removeQueries({ queryKey: userKeys.all });
  };

  return useMutation({
    mutationFn: postLogout,
    onSuccess: cleanup,
    onError: cleanup,
  });
};
