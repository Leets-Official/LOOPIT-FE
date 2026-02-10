import { getStatusCount } from '@pages/mypage/model/filterTradeItems';
import type { TradeHistoryItem } from '@shared/apis/mypage';

describe('getStatusCount', () => {
  const mockItems: TradeHistoryItem[] = [
    {
      postId: 1,
      thumbnailUrl: '/img1.jpg',
      title: '아이폰 15',
      price: 1200000,
      status: 'SALE',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      postId: 2,
      thumbnailUrl: '/img2.jpg',
      title: '갤럭시 S24',
      price: 1500000,
      status: 'RESERVED',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
    },
    {
      postId: 3,
      thumbnailUrl: '/img3.jpg',
      title: '아이폰 14',
      price: 800000,
      status: 'COMPLETED',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
    },
    {
      postId: 4,
      thumbnailUrl: null,
      title: '갤럭시 Z 폴드5',
      price: 2100000,
      status: 'SALE',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
    },
  ];

  it('ALL이면 전체 아이템 개수 반환', () => {
    expect(getStatusCount(mockItems, 'ALL')).toBe(4);
  });

  it('SALE 상태 개수 반환', () => {
    expect(getStatusCount(mockItems, 'SALE')).toBe(2);
  });

  it('RESERVED 상태 개수 반환', () => {
    expect(getStatusCount(mockItems, 'RESERVED')).toBe(1);
  });

  it('COMPLETED 상태 개수 반환', () => {
    expect(getStatusCount(mockItems, 'COMPLETED')).toBe(1);
  });

  it('빈 배열이면 0 반환', () => {
    expect(getStatusCount([], 'ALL')).toBe(0);
    expect(getStatusCount([], 'SALE')).toBe(0);
  });

  it('해당 상태가 없으면 0 반환', () => {
    const onlySaleItems = mockItems.filter((item) => item.status === 'SALE');
    expect(getStatusCount(onlySaleItems, 'COMPLETED')).toBe(0);
  });
});
