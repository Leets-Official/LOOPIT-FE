import { RepairList, type RepairListItem } from '@shared/ui/RepairList';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BUY_ITEMS, FAVORITE_PRODUCT_ITEMS, FAVORITE_REPAIR_ITEMS, SELL_ITEMS } from '../mocks';
import { CommonTabs, type CommonTabItem } from './CommonTabs';
import { MyPageTabs, type MyPageTab } from './MyPageTabs';
import { PageContainer } from './PageContainer';
import { ProfileSummaryCard } from './ProfileSummaryCard';
import { TradeItemList, type TradeListItem } from './TradeItemList';
import { getProfileSummary } from '../model/profileStorage';

const MAIN_TABS: MyPageTab[] = [
  { id: 'buy', label: '구매 내역' },
  { id: 'sell', label: '판매 내역' },
  { id: 'favorite', label: '찜한 목록' },
] as const;

type MainTabId = MyPageTab['id'];

type StatusFilter = 'all' | 'buying' | 'reserved' | 'completed';

const getStatusCount = (items: TradeListItem[], status: StatusFilter) => {
  if (status === 'all') {
    return items.length;
  }
  return items.filter((item) => item.status === status).length;
};

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTabId>('buy');
  const [buyStatus, setBuyStatus] = useState<StatusFilter>('all');
  const [sellStatus, setSellStatus] = useState<StatusFilter>('all');
  type FavoriteCategory = 'product' | 'repair';
  const [favoriteCategory, setFavoriteCategory] = useState<FavoriteCategory>('product');
  const profileSummary = getProfileSummary();

  const buyStatusTabs = useMemo<Array<CommonTabItem<StatusFilter>>>(
    () => [
      { id: 'all', label: '전체', count: getStatusCount(BUY_ITEMS, 'all') },
      { id: 'buying', label: '구매중', count: getStatusCount(BUY_ITEMS, 'buying') },
      { id: 'reserved', label: '예약중', count: getStatusCount(BUY_ITEMS, 'reserved') },
      { id: 'completed', label: '구매완료', count: getStatusCount(BUY_ITEMS, 'completed') },
    ],
    []
  );

  const sellStatusTabs = useMemo<Array<CommonTabItem<StatusFilter>>>(
    () => [
      { id: 'all', label: '전체', count: getStatusCount(SELL_ITEMS, 'all') },
      { id: 'buying', label: '판매중', count: getStatusCount(SELL_ITEMS, 'buying') },
      { id: 'reserved', label: '예약중', count: getStatusCount(SELL_ITEMS, 'reserved') },
      { id: 'completed', label: '판매완료', count: getStatusCount(SELL_ITEMS, 'completed') },
    ],
    []
  );

  const favoriteTabs = useMemo<Array<CommonTabItem<FavoriteCategory>>>(
    () => [
      { id: 'product', label: '상품', count: FAVORITE_PRODUCT_ITEMS.length },
      { id: 'repair', label: '수리점', count: FAVORITE_REPAIR_ITEMS.length },
    ],
    []
  );

  const filteredBuyItems = useMemo(() => {
    if (buyStatus === 'all') {
      return BUY_ITEMS;
    }
    return BUY_ITEMS.filter((item) => item.status === buyStatus);
  }, [buyStatus]);

  const filteredSellItems = useMemo(() => {
    if (sellStatus === 'all') {
      return SELL_ITEMS;
    }
    return SELL_ITEMS.filter((item) => item.status === sellStatus);
  }, [sellStatus]);

  const handleRepairContact = (_item: RepairListItem) => {
    // TODO: 수리점 연락하기 기능 연동 후 처리
  };

  const handleRepairFindRoute = (_item: RepairListItem) => {
    // TODO: 수리점 길찾기 기능 연동 후 처리
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
            onSettingsClick={() => navigate('/mypage/settings', { viewTransition: true })}
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
              gridClassName="grid-cols-2"
              labelClassName="typo-caption-2"
              countClassName="typo-body-1"
              countActiveClassName="text-green-700"
              countInactiveClassName="text-gray-900"
            />
            {favoriteCategory === 'product' ? (
              <TradeItemList items={FAVORITE_PRODUCT_ITEMS} emptyMessage="찜한 목록이 아직 없어요." />
            ) : (
              <RepairList
                items={FAVORITE_REPAIR_ITEMS}
                emptyMessage="찜한 수리점이 아직 없어요."
                onContact={handleRepairContact}
                onFindRoute={handleRepairFindRoute}
              />
            )}
          </>
        ) : (
          <>
            <CommonTabs
              title={activeTab === 'buy' ? '구매 내역' : '판매 내역'}
              tabs={activeTab === 'buy' ? buyStatusTabs : sellStatusTabs}
              activeId={activeTab === 'buy' ? buyStatus : sellStatus}
              onChange={(id) => {
                if (activeTab === 'buy') {
                  setBuyStatus(id);
                } else {
                  setSellStatus(id);
                }
              }}
              gridClassName="grid-cols-4"
              labelClassName="typo-body-1"
              countClassName="typo-title-3"
              countActiveClassName="text-green-700"
              countInactiveClassName="text-gray-900"
            />
            <TradeItemList
              items={activeTab === 'buy' ? filteredBuyItems : filteredSellItems}
              emptyMessage="선택한 조건에 해당하는 상품은 없어요."
            />
          </>
        )}
      </PageContainer>
    </main>
  );
}
