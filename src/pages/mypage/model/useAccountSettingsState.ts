import { useLogoutMutation } from '@shared/apis/auth';
import { uploadImages } from '@shared/apis/image';
import { useMyPageProfileQuery } from '@shared/apis/mypage';
import { useAuth, useUpdateUserImageMutation } from '@shared/apis/user';
import { useToast } from '@shared/hooks';
import { useEffect, useRef, useState } from 'react';

export const useAccountSettingsState = () => {
  const { showToast } = useToast();
  const { data: profileData, isPending: isProfileLoading } = useMyPageProfileQuery();
  const { user: userData, isLoading: isUserLoading, errorMessage: userErrorMessage } = useAuth();
  const updateImageMutation = useUpdateUserImageMutation();
  const logoutMutation = useLogoutMutation();

  const profileSummary = {
    nickname: profileData?.nickname ?? userData?.nickname ?? '',
    email: profileData?.email ?? userData?.email ?? '',
    profileImage: profileData?.profileImageUrl ?? userData?.profileImage ?? '',
  };

  const [profileImage, setProfileImage] = useState(profileSummary.profileImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profileData?.profileImageUrl) {
      setProfileImage(profileData.profileImageUrl);
    }
  }, [profileData?.profileImageUrl]);

  useEffect(() => {
    if (userErrorMessage) {
      showToast(userErrorMessage, 'error');
    }
  }, [userErrorMessage, showToast]);

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userData) {
      return;
    }

    try {
      const { fileUrls } = await uploadImages('PROFILE', [file]);
      const imgUrl = fileUrls[0];
      setProfileImage(imgUrl);
      await updateImageMutation.mutateAsync({ userId: userData.userId, imgUrl });
      showToast('프로필 사진이 변경되었습니다', 'success');
    } catch {
      showToast('프로필 사진 변경에 실패했습니다', 'error');
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isLoading = isProfileLoading && isUserLoading;

  return {
    isLoading,
    profileSummary,
    profileImage,
    fileInputRef,
    handleProfileClick,
    handleProfileChange,
    handleLogout,
  };
};
