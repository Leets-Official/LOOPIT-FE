import { ChevronRightIcon, PictureIcon } from '@shared/assets/icons';
import { MY_PAGE_PROFILE } from '@shared/mocks/data/mypage';
import { Profile } from '@shared/ui/Profile';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';
import { getProfileSummary, saveProfile } from '../model/profileStorage';

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
    // NOTE: 로그아웃 API 연동 후 핸들러 구현 예정
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
              className="right-xxxs bottom-xxxs h-xxxl w-xxxl p-xxxs absolute flex items-center justify-center rounded-full border border-gray-300 bg-white"
              aria-label="프로필 사진 변경"
            >
              <PictureIcon className="h-[18px] w-[18px] text-gray-500" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleProfileChange} />
          </div>
        </div>

        <section className="mt-12.25">
          <h2 className="typo-title-2 text-gray-900">내 정보</h2>
          <div className="mt-xxxl flex flex-col gap-12.25">
            <button
              type="button"
              onClick={() => navigate('/mypage/profile', { viewTransition: true })}
              className="px-xxs py-xxs flex h-11 w-full items-center justify-between text-left"
            >
              <span className="typo-body-1 text-gray-900">개인정보 관리</span>
              <ChevronRightIcon className="h-6 w-[23px] text-gray-900" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-xxs py-xxs flex h-11 w-full items-center justify-between text-left"
            >
              <span className="typo-body-1 text-gray-900">로그아웃</span>
              <ChevronRightIcon className="h-6 w-[23px] text-gray-900" />
            </button>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
