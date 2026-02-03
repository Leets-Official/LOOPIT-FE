import { useKakaoLoginCallback } from '../model/useKakaoLoginCallback';

export const KakaoLogin = () => {
  const { errorMessage } = useKakaoLoginCallback();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white px-6">
      {errorMessage ? (
        <p className="typo-body-1 text-red-500">{errorMessage}</p>
      ) : (
        <>
          <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="typo-body-1 text-gray-600">카카오 로그인 처리중</p>
        </>
      )}
    </div>
  );
};
