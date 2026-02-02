import { loginBackgroundImg } from '@shared/assets/background';
import { kakaoLoginImg } from '@shared/assets/icons';
import { Logo } from '@shared/ui/Logo';
import { loginStyles as s } from './LoginPage.styles';

const LoginPage = () => {
  const kakaoRestKey = import.meta.env.VITE_KAKAO_REST_KEY;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  // 카카오 authorize URL 생성 (REST API 키 + redirect URI).
  const kakaoAuthUrl =
    kakaoRestKey && kakaoRedirectUri
      ? `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestKey}&redirect_uri=${encodeURIComponent(
          kakaoRedirectUri,
        )}&response_type=code`
      : null;

  const handleKakaoLogin = () => {
    // 카카오 로그인 시작: 카카오 인증 페이지로 이동.
    if (!kakaoAuthUrl) {
      return;
    }
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className={s.wrapper} style={{ backgroundImage: `url(${loginBackgroundImg})` }}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[26px] px-6 py-12">
        <Logo className="h-[36px] w-[192px] cursor-pointer" />

        <div className="flex flex-col items-center gap-[61px]">
          <p className={s.greeting}>만나서 반가워요!</p>

          <button type="button" className={s.kakaoButton} aria-label="카카오 로그인" onClick={handleKakaoLogin}>
            <img src={kakaoLoginImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
