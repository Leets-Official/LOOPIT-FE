import { zodResolver } from '@hookform/resolvers/zod';
import pictureIcon from '@shared/assets/icons/common/picture.svg';
import logo from '@shared/assets/logo/logo.svg';
import { ROUTES } from '@shared/constants/routes';
import { Button } from '@shared/ui/Button/Button';
import { Profile } from '@shared/ui/Profile';
import { DateField } from '@shared/ui/TextField';
import { TextField } from '@shared/ui/TextField/TextField';
import { signupSchema, type SignupFormData } from '@shared/utils/schemas';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { signupStyles } from './SignupPage.styles';
export default function SignupPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
  const onSubmit = (data: SignupFormData) => {
    void data;
  };
  const handleLogoClick = () => {
    navigate(ROUTES.MAIN);
  };
  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (profileImage) {
      URL.revokeObjectURL(profileImage);
    }
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };
  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={signupStyles.form}>
      {' '}
      <div className="flex w-full max-w-[1440px] flex-col items-center px-6 pb-24">
        {' '}
        {/* 헤더 */}{' '}
        <section className="flex w-full flex-col items-center gap-[10px] bg-green-50 px-6 py-10">
          {' '}
          <header className="flex flex-col items-center gap-[16px] xl:flex-row xl:gap-[35px]">
            {' '}
            <img
              src={logo}
              alt="LOOPIT Logo"
              className="h-[36px] w-[192px] cursor-pointer"
              onClick={handleLogoClick}
            />{' '}
            <div className="flex flex-col gap-[8px] text-center xl:text-left">
              {' '}
              <h1 className="typo-title-3 text-black">회원가입</h1>{' '}
              <p className="typo-body-1 text-black">루핏 가입을 위해 회원님 정보를 입력해주세요.</p>{' '}
            </div>{' '}
          </header>{' '}
        </section>{' '}
        {/* 콘텐츠 */}{' '}
        <section className="mt-[80px] w-full">
          {' '}
          <div className="flex w-full flex-col items-start gap-[67px]">
            {' '}
            {/* 프로필 사진 */}
            <section className="flex h-[214px] w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>프로필 사진</span>
              <div className="flex w-full justify-center">
                <button
                  type="button"
                  className="relative h-[182px] w-[182px] cursor-pointer"
                  onClick={handleSelectImage}
                >
                  <Profile size="lg" image={profileImage} className="h-[182px] w-[182px]" />
                  <div className="absolute right-0 bottom-0 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--color-gray-300)] bg-white">
                    <img src={pictureIcon} alt="사진 선택" className="h-[40px] w-[40px]" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </button>
              </div>
            </section>
            {/* 이메일 */}{' '}
            <section className="flex w-full flex-col gap-[16px]">
              {' '}
              <span className={signupStyles.sectionLabel}>이메일</span>{' '}
              <TextField
                placeholder="이메일을 입력해주세요"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />{' '}
            </section>{' '}
            {/* 이름 */}{' '}
            <section className="flex w-full flex-col gap-[16px]">
              {' '}
              <span className={signupStyles.sectionLabel}>이름</span>{' '}
              <TextField
                placeholder="이름을 입력해주세요"
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />{' '}
            </section>{' '}
            {/* 생년월일 */}{' '}
            <section className="flex w-full flex-col gap-[16px]">
              {' '}
              <span className={signupStyles.sectionLabel}>생년월일</span>{' '}
              <DateField
                {...register('birthDate')}
                error={Boolean(errors.birthDate)}
                helperText={errors.birthDate?.message}
              />{' '}
            </section>{' '}
            {/* 닉네임 */}{' '}
            <section className="flex w-full flex-col gap-[16px]">
              {' '}
              <span className={signupStyles.sectionLabel}>닉네임</span>{' '}
              <TextField
                placeholder="2~20자의 닉네임"
                {...register('nickname')}
                error={Boolean(errors.nickname)}
                helperText={errors.nickname?.message}
              />{' '}
            </section>{' '}
          </div>{' '}
        </section>{' '}
        {/* 회원가입 버튼 */}{' '}
        <section className="mt-[127px] flex w-full justify-center xl:justify-end">
          {' '}
          <Button variant="fill" size="auto" className="w-full max-w-[286px]" type="submit">
            {' '}
            회원가입 완료{' '}
          </Button>{' '}
        </section>{' '}
      </div>{' '}
    </form>
  );
}
