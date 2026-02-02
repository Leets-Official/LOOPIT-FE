import { Logo } from '@shared/ui/Logo';

export const SignupHeader = () => {
  return (
    <section className="gap-xxs flex w-full flex-col items-center bg-green-50 px-6 py-10">
      <header className="gap-m flex flex-col items-center xl:flex-row xl:gap-[35px]">
        <Logo className="h-[36px] w-[192px] cursor-pointer" />
        <div className="gap-xxxs flex flex-col text-center xl:text-left">
          <h1 className="typo-title-3 text-black">회원가입</h1>
          <p className="typo-body-1 text-black">루핏 가입을 위해 회원님 정보를 입력해주세요.</p>
        </div>
      </header>
    </section>
  );
};
