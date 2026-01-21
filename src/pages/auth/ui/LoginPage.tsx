import kakaoLogin from '@/shared/assets/auth/kakao_login_medium_wide.png';
import loginBg from '@/shared/assets/background/login_background.png';
import logo from '@/shared/assets/logo/logo.svg';
import { loginStyles as s } from './LoginPage.styles';

export default function LoginPage() {
  return (
    <div className={s.wrapper} style={{ backgroundImage: `url(${loginBg})` }}>
      <div className={s.content}>
        {/* Logo */}
        <img src={logo} alt="OOPIT Logo" className={s.logo} />

        {/* Greeting + Kakao */}
        <div className={s.loginSection}>
          <p className={s.greeting}>만나서 반가워요!</p>

          <button
            className={s.kakaoButton}
            onClick={() => {
              console.log('카카오 로그인 클릭');
            }}
          >
            <img
              src={kakaoLogin}
              alt="카카오 로그인"
              className={s.kakaoImage}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
