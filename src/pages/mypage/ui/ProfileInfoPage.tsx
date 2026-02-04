import { ROUTES } from '@shared/constants';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';
import { PersonalInfoForm } from './PersonalInfoForm';
import { getPersonalInfoDefaults, saveProfile } from '../model/profileStorage';

const ProfileInfoPage = () => {
  const navigate = useNavigate();
  const defaultValues = getPersonalInfoDefaults();

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
