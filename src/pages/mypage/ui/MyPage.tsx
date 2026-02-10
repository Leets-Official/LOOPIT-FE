import { getProfileSummary } from '@pages/mypage/model/profileStorage';
import { useMyPageState } from '@pages/mypage/model/useMyPageState';
import { ROUTES } from '@shared/constants';
import { RepairList, type RepairListItem } from '@shared/ui/RepairList';
import { useNavigate } from 'react-router';
import { CommonTabs } from './CommonTabs';
import { MyPageTabs, type MyPageTab } from './MyPageTabs';
import { PageContainer } from './PageContainer';
import { ProfileSummaryCard } from './ProfileSummaryCard';
import { TradeItemList } from './TradeItemList';
import type { MainTabId } from '@pages/mypage/model/types';

const MAIN_TABS: Array<MyPageTab<MainTabId>> = [
  { id: 'buy', label: '구매 내역' },
  { id: 'sell', label: '판매 내역' },
  { id: 'favorite', label: '찜한 목록' },
];

const MyPage = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    currentStatus,
    handleStatusChange,
    favoriteCategory,
    setFavoriteCategory,
    favoriteTabs,
    currentStatusTabs,
    currentFilteredItems,
    favoriteProductItems,
    favoriteRepairItems,
    profileData,
  } = useMyPageState();
  const fallbackProfile = getProfileSummary();
  const profileSummary = {
    nickname: profileData?.nickname ?? fallbackProfile.nickname,
    email: profileData?.email ?? fallbackProfile.email,
    profileImage: profileData?.profileImageUrl ?? fallbackProfile.profileImage,
  };

  const handleRepairContact = (_item: RepairListItem) => {
    // NOTE: 수리점 연락하기 기능 연동 후 처리 예정
  };

  const handleRepairFindRoute = (_item: RepairListItem) => {
    // NOTE: 수리점 길찾기 기능 연동 후 처리 예정
  };

  return (
    <main className="min-h-screen bg-white">
      <PageContainer>
        <h1 className="typo-title-2 text-gray-900">마이페이지</h1>

        <div className="mt-6">
          <ProfileSummaryCard
            nickname={profileSummary.nickname}
            email={profileSummary.email}
            profileImage={profileSummary.profileImage}
            onSettingsClick={() => navigate(ROUTES.MYPAGE_SETTINGS, { viewTransition: true })}
          />
        </div>

        <div className="mt-8">
          <MyPageTabs tabs={MAIN_TABS} activeId={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 'favorite' ? (
          <>
            <CommonTabs
              title="찜한 목록"
              tabs={favoriteTabs}
              activeId={favoriteCategory}
              onChange={setFavoriteCategory}
              gridClassName="w-full grid grid-cols-2 lg:flex lg:justify-center lg:gap-[261px] lg:px-[434.5px]"
              labelClassName="typo-body-1"
              countClassName="typo-title-3"
              countActiveClassName="text-green-700"
              countInactiveClassName="text-gray-900"
              countColorMode="positive"
              itemClassName="lg:first:justify-self-start lg:last:justify-self-end"
            />
            {favoriteCategory === 'product' ? (
              <TradeItemList items={favoriteProductItems} emptyMessage="찜한 목록이 아직 없어요." />
            ) : (
              <RepairList
                items={favoriteRepairItems}
                emptyMessage="찜한 목록이 아직 없어요."
                onContact={handleRepairContact}
                onFindRoute={handleRepairFindRoute}
              />
            )}
          </>
        ) : (
          <>
            <CommonTabs
              title={activeTab === 'buy' ? '구매 내역' : '판매 내역'}
              tabs={currentStatusTabs}
              activeId={currentStatus}
              onChange={handleStatusChange}
              gridClassName="w-full grid grid-cols-3 lg:flex lg:justify-center lg:gap-[261px] lg:px-[276px]"
              labelClassName="typo-body-1"
              countClassName="typo-title-3"
              countActiveClassName="text-green-700"
              countInactiveClassName="text-gray-900"
              countColorMode="positive"
              itemClassName="lg:first:justify-self-start lg:last:justify-self-end"
            />
            <TradeItemList items={currentFilteredItems} emptyMessage="선택한 조건에 해당하는 상품은 없어요." />
          </>
        )}
      </PageContainer>
    </main>
  );
};

export default MyPage;
