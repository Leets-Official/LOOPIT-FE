import { useMyPageProfileQuery } from '@shared/apis/mypage';
import { ROUTES } from '@shared/constants';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';
import { PersonalInfoForm } from './PersonalInfoForm';
import { getPersonalInfoDefaults, saveProfile } from '../model/profileStorage';

const ProfileInfoPage = () => {
  const navigate = useNavigate();
  const { data: profileData } = useMyPageProfileQuery();
  const storedDefaults = getPersonalInfoDefaults();
  const defaultValues = {
    ...storedDefaults,
    nickname: profileData?.nickname ?? storedDefaults.nickname,
    email: profileData?.email ?? storedDefaults.email,
  };

  return (
    <main className="min-h-screen bg-white">
      <PageContainer>
        <h1 className="typo-title-2 text-gray-900">개인정보 관리</h1>
        <PersonalInfoForm
          defaultValues={defaultValues}
          onSave={(values) => {
            saveProfile(values);
            navigate(ROUTES.MYPAGE, { viewTransition: true });
          }}
        />
      </PageContainer>
    </main>
  );
};

export default ProfileInfoPage;
