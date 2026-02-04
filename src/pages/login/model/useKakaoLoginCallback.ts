import { useKakaoLoginMutation } from '@shared/apis/auth';
import { getUser, userKeys } from '@shared/apis/user';
import { ROUTES } from '@shared/constants';
import { useAuthStore } from '@shared/stores';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const useKakaoLoginCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync } = useKakaoLoginMutation();
  const { setAccessToken, setKakaoId, setUserId } = useAuthStore();
  const queryClient = useQueryClient();
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) {
      return;
    }

    const code = searchParams.get('code');

    if (!code) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    const handleLogin = async () => {
      try {
        const res = await mutateAsync({ code });

        setAccessToken(res.accessToken);
        setUserId(res.userId);

        if (res.registered) {
          // 유저 정보 미리 fetch 후 navigate
          await queryClient.prefetchQuery({
            queryKey: userKeys.detail(res.userId),
            queryFn: () => getUser(res.userId),
          });
          navigate(ROUTES.MAIN, { replace: true });
        } else {
          setKakaoId(res.kakaoId);
          navigate(ROUTES.SIGNUP, { replace: true });
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.');
      }
    };

    hasCalledRef.current = true;
    handleLogin();
  }, [mutateAsync, navigate, queryClient, searchParams, setAccessToken, setKakaoId, setUserId]);

  return { errorMessage };
};
