import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';
import { PersonalInfoForm } from './PersonalInfoForm';
import { getPersonalInfoDefaults, saveProfile } from '../utils/profileStorage';

export default function ProfileInfoPage() {
  const navigate = useNavigate();
  const defaultValues = useMemo(() => getPersonalInfoDefaults(), []);

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
