import { useAccountSettingsState } from '@pages/mypage/model/useAccountSettingsState';
import { ChevronRightIcon, PictureIcon } from '@shared/assets/icons';
import { ROUTES } from '@shared/constants';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { Profile } from '@shared/ui/Profile';
import { useNavigate } from 'react-router';
import { PageContainer } from './PageContainer';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    profileSummary,
    profileImage,
    fileInputRef,
    handleProfileClick,
    handleProfileChange,
    handleLogout,
  } = useAccountSettingsState();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <main className="min-h-screen bg-white">
      <PageContainer>
        <h1 className="typo-title-2 text-gray-900">계정 설정</h1>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative inline-flex">
            <Profile size="lg" image={profileImage} alt={`${profileSummary.nickname} 프로필`} />
            <button
              type="button"
              onClick={handleProfileClick}
              className="absolute right-0 bottom-0 flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-1.5 md:p-2"
              aria-label="프로필 사진 변경"
            >
              <PictureIcon className="h-[18px] w-[18px] text-gray-500 md:h-6 md:w-6" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleProfileChange} />
          </div>
        </div>

        <section className="mt-12.25">
          <h2 className="typo-title-2 text-gray-900">내 정보</h2>
          <div className="mt-xxxl flex flex-col gap-12.25">
            <button
              type="button"
              onClick={() => navigate(ROUTES.MYPAGE_PROFILE, { viewTransition: true })}
              className="px-xxs py-xxs flex h-11 w-full cursor-pointer items-center justify-between text-left"
            >
              <span className="typo-body-1 text-gray-900">개인정보 관리</span>
              <ChevronRightIcon className="h-6 w-[23px] text-gray-900" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-xxs py-xxs flex h-11 w-full cursor-pointer items-center justify-between text-left"
            >
              <span className="typo-body-1 text-gray-900">로그아웃</span>
              <ChevronRightIcon className="h-6 w-[23px] text-gray-900" />
            </button>
          </div>
        </section>
      </PageContainer>
    </main>
  );
};

export default AccountSettingsPage;
