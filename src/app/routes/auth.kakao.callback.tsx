import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

type KakaoLoginResponse = {
  status: number;
  message: string;
  data: {
    registered: boolean;
    kakaoId: string;
  };
};

export default function KakaoCallbackRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setErrorMessage('카카오 인증 코드가 없습니다.');
      return;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!baseUrl) {
      setErrorMessage('API 설정이 필요합니다.');
      return;
    }

    const requestLogin = async () => {
      try {
        // 카카오 인증 code를 백엔드로 전달해 로그인 처리 + 가입 여부 확인.
        const response = await fetch(`${baseUrl}/auth/login/kakao?code=${encodeURIComponent(code)}`);
        if (!response.ok) {
          throw new Error('카카오 로그인 요청에 실패했습니다.');
        }
        const payload = (await response.json()) as KakaoLoginResponse;
        if (payload.data?.registered) {
          // 기존 회원이면 바로 메인으로 이동.
          navigate('/', { replace: true });
          return;
        }
        if (!payload.data?.kakaoId) {
          throw new Error('카카오 로그인 응답에 kakaoId가 없습니다.');
        }
        // 신규 회원이면 kakaoId를 붙여 회원가입 페이지로 이동.
        navigate(`/signup?kakaoId=${encodeURIComponent(payload.data.kakaoId)}`, { replace: true });
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.');
      }
    };

    void requestLogin();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-6 text-black">
      <p className="typo-body-1">{errorMessage ?? '카카오 로그인 처리중입니다...'}</p>
    </div>
  );
}
