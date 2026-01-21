import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/Button/Button';
import { DateField } from '@shared/ui/TextField';
import { TextField } from '@shared/ui/TextField/TextField';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import pictureIcon from '@/shared/assets/icons/common/picture.svg';
import logo from '@/shared/assets/logo/logo.svg';
import { Profile } from '@/shared/ui/Profile';
import { signupSchema, type SignupFormData } from '@/utils/schemas';
import { signupStyles } from './SignupPage.styles';

export default function SignupPage() {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    void data;
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) {return;}

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
      <div className="flex w-full max-w-[1440px] flex-col items-center px-6 pb-24 md:px-[120px] md:pb-[258px]">
        {/* 헤더 */}
        <section className="flex w-full flex-col items-center gap-[10px] bg-green-50 px-6 py-10 md:px-[309px] md:py-[61px]">
          <header className="flex flex-col items-center gap-[16px] md:flex-row md:gap-[35px]">
            <img src={logo} alt="LOOPIT Logo" className="h-[36px] w-[192px]" />
            <div className="flex flex-col gap-[8px]">
              <h1 className="typo-title-3 text-black">회원가입</h1>
              <p className="typo-body-1 text-black">루핏 가입을 위해 회원님 정보를 입력해주세요.</p>
            </div>
          </header>
        </section>

        {/* 콘텐츠 */}
        <section className="mt-[80px] w-full">
          <div className="flex w-full flex-col items-start gap-[67px] md:w-[1200px]">
            {/* 프로필 사진 */}
            <section className="flex h-[214px] w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>프로필 사진</span>

              <div className={signupStyles.profilePicker}>
                <button type="button" className={signupStyles.profileImageWrap} onClick={handleSelectImage}>
                  <Profile size="lg" image={profileImage} className={signupStyles.profileLarge} />

                  <div className="absolute bottom-0 right-0 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--color-gray-300)] bg-white">
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

            {/* 이메일 */}
            <section className="flex w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>이메일</span>
              <TextField
                placeholder="이메일을 입력해주세요"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </section>

            {/* 이름 */}
            <section className="flex w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>이름</span>
              <TextField
                placeholder="이름을 입력해주세요"
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </section>

            {/* 생년월일 */}
            <section className="flex w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>생년월일</span>
              <DateField
                {...register('birthDate')}
                error={Boolean(errors.birthDate)}
                helperText={errors.birthDate?.message}
              />
            </section>

            {/* 닉네임 */}
            <section className="flex w-full flex-col gap-[16px]">
              <span className={signupStyles.sectionLabel}>닉네임</span>
              <TextField
                placeholder="2~20자의 닉네임"
                {...register('nickname')}
                error={Boolean(errors.nickname)}
                helperText={errors.nickname?.message}
              />
            </section>
          </div>
        </section>

        {/* 회원가입 버튼 */}
        <section className="mt-[127px] flex w-full justify-center md:justify-end">
          <Button variant="fill" size="auto" className="w-full max-w-[286px]" onClick={handleSubmit(onSubmit)}>
            회원가입 완료
          </Button>
        </section>
      </div>
    </form>
  );
}
