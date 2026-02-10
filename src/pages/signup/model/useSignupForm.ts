import { zodResolver } from '@hookform/resolvers/zod';
import { useKakaoRegisterMutation } from '@shared/apis/auth';
import { ROUTES } from '@shared/constants';
import { useImagePreview, useS3ImageUpload, useScrollToError, useToast } from '@shared/hooks';
import { useAuthStore } from '@shared/stores';
import { signupSchema, type SignupFormData } from '@shared/utils/schemas';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useSignupForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { kakaoId, setKakaoId, setAccessToken, setUserId } = useAuthStore();
  const {
    imageUrl: profileImage,
    file: profileFile,
    fileInputRef,
    handleSelectImage,
    handleImageChange,
  } = useImagePreview();
  const { upload } = useS3ImageUpload();
  const { mutate } = useKakaoRegisterMutation();
  const { scrollToFirstError } = useScrollToError<SignupFormData>(['email', 'name', 'birthDate', 'nickname']);

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

    setIsSubmitting(true);

    let uploadedImageUrl = '';

    if (profileFile) {
      const fileUrl = await upload('PROFILE', profileFile);
      if (!fileUrl) {
        setIsSubmitting(false);
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
          showToast('회원가입이 완료되었습니다', 'success');
          navigate(ROUTES.MAIN, { replace: true });
        },
        onError: () => {
          showToast('회원가입에 실패했습니다');
          setIsSubmitting(false);
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
    scrollToFirstError,
    isSubmitting,
  };
};
