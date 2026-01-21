import loginBg from '@shared/assets/background/login_background.png';
import { kakaoLoginImg } from '@shared/assets/icons';
import logo from '@shared/assets/logo/logo.svg';
import { ROUTES } from '@shared/constants/routes';
import { useNavigate } from 'react-router';
import { loginStyles as s } from './LoginPage.styles';

export default function LoginPage() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(ROUTES.MAIN);
  };
  return (
    <div className={s.wrapper} style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[26px] px-6 py-12">
        <img src={logo} alt="LOOPIT Logo" className="h-[36px] w-[192px] cursor-pointer" onClick={handleLogoClick} />

        <div className="flex flex-col items-center gap-[61px]">
          <p className={s.greeting}>만나서 반가워요!</p>

          <button
            className={s.kakaoButton}
            onClick={() => {
              console.log('카카오 로그인 클릭');
            }}
          >
            <img src={kakaoLoginImg} alt="카카오 로그인" />
          </button>
        </div>
      </div>
    </div>
  );
}
