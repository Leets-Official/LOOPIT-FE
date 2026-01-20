import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/Button/Button';
import { DateField } from '@shared/ui/TextField';
import { TextField } from '@shared/ui/TextField/TextField';
import { useRef, useState } from 'react';
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
    console.log(' 회원가입 데이터', data);
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={signupStyles.form}>
      <div className={signupStyles.container}>
        {/* ===== 헤더 ===== */}
        <section className={signupStyles.headerSection}>
          <header className={signupStyles.header}>
            <img src={logo} alt="LOOPIT Logo" className={signupStyles.logo} />
            <div className={signupStyles.headerText}>
              <h1 className={signupStyles.title}>회원가입</h1>
              <p className={signupStyles.subtitle}>루핏 가입을 위해 회원님 정보를 입력해주세요.</p>
            </div>
          </header>
        </section>

        {/* ===== 콘텐츠 ===== */}
        <section className={signupStyles.contentSection}>
          <div className={signupStyles.contentWrapper}>
            {/* ===== 프로필 사진 ===== */}
            <section className={signupStyles.profileSection}>
              <span className={signupStyles.sectionLabel}>프로필 사진</span>

              <div className={signupStyles.profilePicker}>
                <button className={signupStyles.profileImageWrap} onClick={handleSelectImage}>
                  <Profile size="lg" image={profileImage} className={signupStyles.profileLarge} />

                  <div className={signupStyles.profileBadge}>
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

            {/* ===== 이메일 ===== */}
            <section className={signupStyles.fieldSection}>
              <span className={signupStyles.sectionLabel}>이메일</span>
              <TextField
                placeholder="Title"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </section>

            {/* ===== 이름 ===== */}
            <section className={signupStyles.fieldSection}>
              <span className={signupStyles.sectionLabel}>이름</span>
              <TextField
                placeholder="Title"
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </section>

            {/* ===== 생년월일 ===== */}
            <section className={signupStyles.fieldSection}>
              <span className={signupStyles.sectionLabel}>생년월일</span>
              <DateField
                {...register('birthDate')}
                error={Boolean(errors.birthDate)}
                helperText={errors.birthDate?.message}
              />
            </section>

            {/* ===== 닉네임 ===== */}
            <section className={signupStyles.fieldSection}>
              <span className={signupStyles.sectionLabel}>닉네임</span>
              <TextField
                placeholder="Title"
                {...register('nickname')}
                error={Boolean(errors.nickname)}
                helperText={errors.nickname?.message}
              />
            </section>
          </div>
        </section>

        {/* ===== 회원가입 버튼 ===== */}
        <section className={signupStyles.submitSection}>
          <Button variant="fill" size="auto" className={signupStyles.submitButton} onClick={handleSubmit(onSubmit)}>
            회원가입 완료
          </Button>
        </section>
      </div>
    </form>
  );
}
