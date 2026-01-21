import kakaoLogin from '@shared/assets/auth/kakao_login_medium_wide.png';
import loginBg from '@shared/assets/background/login_background.png';
import logo from '@shared/assets/logo/logo.svg';
import { loginStyles as s } from './LoginPage.styles';

export default function LoginPage() {
  return (
    <div className={s.wrapper} style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[26px] px-6 py-12 md:px-[468px] md:py-[290px]">
        {/* Logo */}
        <img src={logo} alt="LOOPIT Logo" className="h-[36px] w-[192px]" />

        {/* Greeting + Kakao */}
        <div className="flex flex-col items-center gap-[61px]">
          <p className={s.greeting}>만나서 반가워요!</p>

          <button
            className={s.kakaoButton}
            onClick={() => {
              console.log('카카오 로그인 클릭');
            }}
          >
            <img src={kakaoLogin} alt="카카오 로그인" className="h-[45px] w-[300px] object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}
