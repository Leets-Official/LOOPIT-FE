import { useUpdateUserMutation, useUserInfo } from '@shared/apis/user';
import { ROUTES } from '@shared/constants';
import { useToast } from '@shared/hooks';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';
import { PersonalInfoForm } from './PersonalInfoForm';

const ProfileInfoPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: userData, isLoading } = useUserInfo();
  const updateUserMutation = useUpdateUserMutation();

  if (isLoading || !userData) {
    return <LoadingFallback />;
  }

  const defaultValues = {
    nickname: userData.nickname,
    name: userData.name,
    birthDate: userData.birthdate,
    email: userData.email,
  };

  const handleSave = async (values: typeof defaultValues) => {
    try {
      await updateUserMutation.mutateAsync({
        userId: userData.userId,
        data: {
          nickname: values.nickname,
          name: values.name,
          email: values.email,
          birthdate: values.birthDate,
        },
      });
      showToast('저장되었습니다', 'success');
      navigate(ROUTES.MYPAGE, { viewTransition: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
        return;
      }
      showToast('저장에 실패했습니다', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageContainer className="flex flex-col items-start gap-[63px]">
        <h1 className="typo-title-2 text-gray-900">개인정보 관리</h1>
        <PersonalInfoForm
          key={userData.nickname}
          defaultValues={defaultValues}
          onSave={handleSave}
          isPending={updateUserMutation.isPending}
        />
      </PageContainer>
    </main>
  );
};

export default ProfileInfoPage;
