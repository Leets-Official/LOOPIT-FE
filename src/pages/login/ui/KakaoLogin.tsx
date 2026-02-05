import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { useKakaoLoginCallback } from '../model/useKakaoLoginCallback';

export const KakaoLogin = () => {
  const { errorMessage } = useKakaoLoginCallback();

  if (errorMessage) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white px-6">
        <p className="typo-body-1 text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return <LoadingFallback message="로그인 처리 중" />;
};
