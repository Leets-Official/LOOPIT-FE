import pictureIcon from '@shared/assets/icons/common/picture.svg';
import { Button, DateField, Profile, TextField } from '@shared/ui';
import { useSignupForm } from '../model';

const sectionLabel = 'typo-body-2 text-black';
const sectionStyle = 'flex w-full flex-col gap-m';

const FORM_FIELDS = [
  { name: 'email', label: '이메일', placeholder: '이메일을 입력해주세요', type: 'text' },
  { name: 'name', label: '이름', placeholder: '이름을 입력해주세요', type: 'text' },
  { name: 'birthDate', label: '생년월일', placeholder: '', type: 'date' },
  { name: 'nickname', label: '닉네임', placeholder: '2~20자의 닉네임', type: 'text' },
] as const;

export const SignupForm = () => {
  const {
    profileImage,
    fileInputRef,
    handleSelectImage,
    handleImageChange,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
      <section className="mt-[80px] w-full">
        <div className="flex w-full flex-col items-start gap-[67px]">
          <section className="gap-m flex h-[214px] w-full flex-col">
            <span className={sectionLabel}>프로필 사진</span>
            <div className="flex w-full justify-center">
              <button type="button" className="relative h-[182px] w-[182px] cursor-pointer" onClick={handleSelectImage}>
                <Profile size="lg" image={profileImage} className="h-[182px] w-[182px]" />
                <div className="h-xxxl w-xxxl absolute right-0 bottom-0 flex items-center justify-center rounded-full border border-gray-300 bg-white">
                  <img src={pictureIcon} alt="사진 선택" className="h-xxxl w-xxxl" />
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

          {FORM_FIELDS.map((field) => (
            <section key={field.name} className={sectionStyle}>
              <span className={sectionLabel}>{field.label}</span>
              {field.type === 'date' ? (
                <DateField
                  {...register(field.name)}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]?.message}
                />
              ) : (
                <TextField
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]?.message}
                />
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="mt-[127px] flex w-full justify-center xl:justify-end">
        <Button variant="fill" size="auto" className="w-full max-w-[286px]" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '처리중...' : '회원가입 완료'}
        </Button>
      </section>
    </form>
  );
};
