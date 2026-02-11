import { useMyPageState } from '@pages/mypage/model/useMyPageState';
import { useUserInfo } from '@shared/apis/user';
import { useToggleShopWishlistMutation } from '@shared/apis/wishlist';
import { ROUTES } from '@shared/constants';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadingFallback } from '@shared/ui/LoadingFallback';
import { ShopCard } from '@shared/ui/ShopCard';
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
  const toggleShopWishlistMutation = useToggleShopWishlistMutation();
  const {
    isLoading,
    isError,
    activeTab,
    setActiveTab,
    buyStatus,
    sellStatus,
    handleBuyStatusChange,
    handleSellStatusChange,
    favoriteCategory,
    setFavoriteCategory,
    favoriteTabs,
    buyStatusTabs,
    sellStatusTabs,
    buyItems,
    sellItems,
    favoriteProductItems,
    favoriteRepairItems,
    profileData,
  } = useMyPageState();
  const { data: userData } = useUserInfo();
  const profileSummary = {
    nickname: profileData?.nickname ?? userData?.nickname ?? '',
    email: profileData?.email ?? userData?.email ?? '',
    profileImage: profileData?.profileImageUrl ?? userData?.profileImage ?? '',
  };

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white">
        <PageContainer>
          <h1 className="typo-title-2 text-gray-900">마이페이지</h1>
          <EmptyState message="정보를 불러오지 못했어요." className="mt-8 min-h-[400px]" />
        </PageContainer>
      </main>
    );
  }

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
              gridClassName="w-full grid grid-cols-2"
            />
            {favoriteCategory === 'product' ? (
              <TradeItemList items={favoriteProductItems} emptyMessage="찜한 목록이 아직 없어요." />
            ) : favoriteRepairItems.length === 0 ? (
              <EmptyState message="찜한 목록이 아직 없어요." className="mt-8" />
            ) : (
              <div className="mt-8 flex flex-col items-center gap-6">
                {favoriteRepairItems.map((item) => (
                  <ShopCard
                    key={item.id}
                    name={item.name}
                    address={item.address}
                    favoriteActive={item.favoriteActive}
                    onFavoriteToggle={() => {
                      toggleShopWishlistMutation.mutate({
                        shopName: item.name,
                        location: item.address,
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'buy' ? (
          <>
            <CommonTabs title="구매 내역" tabs={buyStatusTabs} activeId={buyStatus} onChange={handleBuyStatusChange} />
            <TradeItemList items={buyItems} emptyMessage="선택한 조건에 해당하는 상품은 없어요." />
          </>
        ) : (
          <>
            <CommonTabs
              title="판매 내역"
              tabs={sellStatusTabs}
              activeId={sellStatus}
              onChange={handleSellStatusChange}
              gridClassName="w-full grid grid-cols-4"
            />
            <TradeItemList items={sellItems} emptyMessage="선택한 조건에 해당하는 상품은 없어요." />
          </>
        )}
      </PageContainer>
    </main>
  );
};

export default MyPage;
