import { PictureIcon } from '@shared/assets/icons';
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
    scrollToFirstError,
    isSubmitting,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit, scrollToFirstError)} className="flex w-full flex-col items-center">
      <section className="mt-10 w-full md:mt-[80px]">
        <div className="flex w-full flex-col items-start gap-10 md:gap-[67px]">
          <section className="gap-m flex h-[214px] w-full flex-col">
            <span className={sectionLabel}>프로필 사진</span>
            <div className="flex w-full justify-center">
              <button type="button" className="relative h-[182px] w-[182px] cursor-pointer" onClick={handleSelectImage}>
                <Profile size="lg" image={profileImage} className="h-[182px] w-[182px]" />
                <div
                  className="absolute right-0 bottom-0 flex items-center justify-center rounded-full border border-gray-300 bg-white p-1.5 md:p-2"
                  aria-label="프로필 사진 변경"
                >
                  <PictureIcon className="h-[18px] w-[18px] text-gray-500 md:h-6 md:w-6" />
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
            <section key={field.name} className={sectionStyle} data-field={field.name}>
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

      <section className="mt-16 flex w-full justify-center md:mt-[127px] xl:justify-end">
        <Button variant="fill" size="auto" className="w-full max-w-[286px]" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '처리중...' : '회원가입 완료'}
        </Button>
      </section>
    </form>
  );
};
