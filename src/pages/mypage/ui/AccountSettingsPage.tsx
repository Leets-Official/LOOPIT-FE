import { ChevronRightIcon, PictureIcon } from '@shared/assets/icons';
import { Profile } from '@shared/ui/Profile';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { MY_PAGE_PROFILE } from '../mocks';
import { PageContainer } from './PageContainer';
import { getProfileSummary, saveProfile } from '../utils/profileStorage';

export default function AccountSettingsPage() {
  const navigate = useNavigate();
  const profileSummary = getProfileSummary();
  const [profileImage, setProfileImage] = useState(profileSummary.profileImage ?? MY_PAGE_PROFILE.profileImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }
      setProfileImage(reader.result);
      saveProfile({ profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 연동 후 핸들러 구현
  };

  return (
    <main className="min-h-screen bg-white">
      <PageContainer>
        <h1 className="typo-title-2 text-gray-900">계정 설정</h1>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative inline-flex h-45 w-45">
            <Profile size="lg" image={profileImage} alt={`${profileSummary.nickname} 프로필`} />
            <button
              type="button"
              onClick={handleProfileClick}
              className="absolute right-[8px] bottom-[8px] flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#C7C7CC] bg-white p-[8px]"
              aria-label="프로필 사진 변경"
            >
              <PictureIcon className="h-4.5 w-4.5 text-gray-500" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleProfileChange} />
          </div>
        </div>

        <section className="mt-12.25">
          <h2 className="typo-title-2 text-gray-900">내 정보</h2>
          <div className="mt-[40px] flex flex-col gap-12.25">
            <button
              type="button"
              onClick={() => navigate('/mypage/profile', { viewTransition: true })}
              className="flex h-11 w-full items-center justify-between px-[10px] py-[10px] text-left"
            >
              <span className="typo-body-1 text-gray-900">개인정보 관리</span>
              <ChevronRightIcon className="h-6 w-5.75 text-gray-900" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-full items-center justify-between px-[10px] py-[10px] text-left"
            >
              <span className="typo-body-1 text-gray-900">로그아웃</span>
              <ChevronRightIcon className="h-6 w-5.75 text-gray-900" />
            </button>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
