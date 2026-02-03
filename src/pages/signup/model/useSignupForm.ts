import { zodResolver } from '@hookform/resolvers/zod';
import { useKakaoRegisterMutation } from '@shared/apis/auth';
import { ROUTES } from '@shared/constants';
import { useImagePreview, useS3ImageUpload } from '@shared/hooks';
import { useAuthStore } from '@shared/stores';
import { signupSchema, type SignupFormData } from '@shared/utils/schemas';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useSignupForm = () => {
  const navigate = useNavigate();
  const { kakaoId, setKakaoId, setAccessToken, setUserId } = useAuthStore();
  const {
    imageUrl: profileImage,
    file: profileFile,
    fileInputRef,
    handleSelectImage,
    handleImageChange,
  } = useImagePreview();
  const { upload } = useS3ImageUpload();
  const { mutate, isPending } = useKakaoRegisterMutation();

  // kakaoId 없으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!kakaoId) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [kakaoId, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormData) => {
    if (!kakaoId) {
      return;
    }

    let uploadedImageUrl = '';

    if (profileFile) {
      const fileUrl = await upload('PROFILE', profileFile);
      if (!fileUrl) {
        return;
      }
      uploadedImageUrl = fileUrl;
    }

    mutate(
      {
        kakaoId,
        nickname: data.nickname,
        name: data.name,
        email: data.email,
        birthdate: data.birthDate,
        profileImage: uploadedImageUrl,
      },
      {
        onSuccess: (res) => {
          setKakaoId(null);
          if (res.accessToken) {
            setAccessToken(res.accessToken);
          }
          setUserId(res.userId);
          navigate(ROUTES.MAIN, { replace: true });
        },
      }
    );
  };

  return {
    profileImage,
    fileInputRef,
    handleSelectImage,
    handleImageChange,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
  };
};
