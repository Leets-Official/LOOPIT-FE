import { useKakaoLoginMutation } from '@shared/apis/auth';
import { ROUTES } from '@shared/constants';
import { useAuthStore } from '@shared/stores';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const useKakaoLoginCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate } = useKakaoLoginMutation();
  const { setAccessToken, setKakaoId, setUserId } = useAuthStore();
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

    hasCalledRef.current = true;
    mutate(
      { code },
      {
        onSuccess: (res) => {
          setAccessToken(res.accessToken);
          setUserId(res.userId);

          if (res.registered) {
            navigate(ROUTES.MAIN, { replace: true });
          } else {
            setKakaoId(res.kakaoId);
            navigate(ROUTES.SIGNUP, { replace: true });
          }
        },
        onError: (error) => {
          setErrorMessage(error.message ?? '카카오 로그인에 실패했습니다.');
        },
      }
    );
  }, [mutate, navigate, searchParams, setAccessToken, setKakaoId, setUserId]);

  return { errorMessage };
};
