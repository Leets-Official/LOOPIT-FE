import { zodResolver } from '@hookform/resolvers/zod';
import pictureIcon from '@shared/assets/icons/common/picture.svg';
import { useImageUpload } from '@shared/hooks';
import { Button } from '@shared/ui/Button/Button';
import { Profile } from '@shared/ui/Profile';
import { DateField } from '@shared/ui/TextField';
import { TextField } from '@shared/ui/TextField/TextField';
import { signupSchema, type SignupFormData } from '@shared/utils/schemas';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

const sectionLabel = 'typo-body-2 text-black';
const sectionStyle = 'flex w-full flex-col gap-m';

const FORM_FIELDS = [
  { name: 'email', label: '이메일', placeholder: '이메일을 입력해주세요', type: 'text' },
  { name: 'name', label: '이름', placeholder: '이름을 입력해주세요', type: 'text' },
  { name: 'birthDate', label: '생년월일', placeholder: '', type: 'date' },
  { name: 'nickname', label: '닉네임', placeholder: '2~20자의 닉네임', type: 'text' },
] as const;

export const SignupForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { imageUrl: profileImage, fileInputRef, handleSelectImage, handleImageChange } = useImageUpload();
  const kakaoId = searchParams.get('kakaoId') ?? '';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormData) => {
    if (!apiBaseUrl || !kakaoId) {
      return;
    }

    // 콜백에서 받은 kakaoId로 신규 회원 가입 요청.
    const response = await fetch(`${apiBaseUrl}/user/register/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kakaoId,
        nickname: data.nickname,
        name: data.name,
        email: data.email,
        birthdate: data.birthDate,
        profileImage: profileImage ?? '',
      }),
    });

    if (!response.ok) {
      return;
    }

    // 가입 완료 후 메인으로 이동.
    navigate('/', { replace: true });
  };

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
        <Button variant="fill" size="auto" className="w-full max-w-[286px]" type="submit">
          회원가입 완료
        </Button>
      </section>
    </form>
  );
};
