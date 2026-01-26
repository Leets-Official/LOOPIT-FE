import { loginBackgroundImg } from '@shared/assets/background';
import { kakaoLoginImg } from '@shared/assets/icons';
import { Logo } from '@shared/ui/Logo';
import { loginStyles as s } from './LoginPage.styles';

export default function LoginPage() {
  return (
    <div className={s.wrapper} style={{ backgroundImage: `url(${loginBackgroundImg})` }}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[26px] px-6 py-12">
        <Logo className="h-[36px] w-[192px] cursor-pointer" />

        <div className="flex flex-col items-center gap-[61px]">
          <p className={s.greeting}>만나서 반가워요!</p>

          <button type="button" className={s.kakaoButton} aria-label="카카오 로그인">
            <img src={kakaoLoginImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
