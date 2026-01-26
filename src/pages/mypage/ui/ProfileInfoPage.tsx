import { useNavigate } from 'react-router';
import { getProfileDefaults, saveProfile } from '../utils/profileStorage';
import { PageContainer } from './components/PageContainer';
import { PersonalInfoForm } from './components/PersonalInfoForm';

export default function ProfileInfoPage() {
  const navigate = useNavigate();
  const defaultValues = getProfileDefaults();

  return (
    <main className="min-h-screen bg-white">
      <PageContainer>
        <h1 className="typo-title-2 text-gray-900">개인정보 관리</h1>
        <PersonalInfoForm
          defaultValues={defaultValues}
          onSave={(values) => {
            saveProfile(values);
            navigate('/mypage', { viewTransition: true });
          }}
        />
      </PageContainer>
    </main>
  );
}
