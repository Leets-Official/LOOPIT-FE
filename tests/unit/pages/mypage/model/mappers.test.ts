import {
  mapBuyHistoryItem,
  mapHistoryItem,
  mapSellHistoryItem,
  mapWishlistPostItem,
  mapWishlistShopItem,
} from '@pages/mypage/model/mappers';
import type { TradeHistoryItem } from '@shared/apis/mypage';
import type { WishlistPostItem, WishlistShopItem } from '@shared/apis/wishlist';

describe('mappers', () => {
  describe('mapHistoryItem', () => {
    const mockItem: TradeHistoryItem = {
      postId: 1,
      thumbnailUrl: '/test.jpg',
      title: '아이폰 15 프로',
      price: 1200000,
      status: 'SALE',
      createdAt: '2024-01-15T10:00:00',
      updatedAt: '2024-01-15T10:00:00',
    };

    it('기본 매핑 수행', () => {
      const result = mapHistoryItem(mockItem);

      expect(result.id).toBe('1');
      expect(result.modelName).toBe('아이폰 15 프로');
      expect(result.price).toBe('1,200,000원');
      expect(result.date).toBe('2024.01.15');
      expect(result.imageUrl).toBe('/test.jpg');
    });

    it('SALE 상태를 active로 변환', () => {
      const result = mapHistoryItem({ ...mockItem, status: 'SALE' });
      expect(result.status).toBe('active');
    });

    it('RESERVED 상태를 reserved로 변환', () => {
      const result = mapHistoryItem({ ...mockItem, status: 'RESERVED' });
      expect(result.status).toBe('reserved');
    });

    it('COMPLETED 상태를 completed로 변환', () => {
      const result = mapHistoryItem({ ...mockItem, status: 'COMPLETED' });
      expect(result.status).toBe('completed');
    });

    it('statusLabel 옵션 적용', () => {
      const result = mapHistoryItem(mockItem, { statusLabel: '판매중' });
      expect(result.statusLabel).toBe('판매중');
    });

    it('thumbnailUrl이 null이면 imageUrl은 undefined', () => {
      const result = mapHistoryItem({ ...mockItem, thumbnailUrl: null });
      expect(result.imageUrl).toBeUndefined();
    });
  });

  describe('mapBuyHistoryItem', () => {
    const mockItem: TradeHistoryItem = {
      postId: 1,
      thumbnailUrl: '/test.jpg',
      title: '아이폰 15',
      price: 1000000,
      status: 'SALE',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    };

    it('SALE 상태면 구매중 라벨', () => {
      const result = mapBuyHistoryItem({ ...mockItem, status: 'SALE' });
      expect(result.statusLabel).toBe('구매중');
    });

    it('RESERVED 상태면 예약중 라벨', () => {
      const result = mapBuyHistoryItem({ ...mockItem, status: 'RESERVED' });
      expect(result.statusLabel).toBe('예약중');
    });

    it('COMPLETED 상태면 구매완료 라벨', () => {
      const result = mapBuyHistoryItem({ ...mockItem, status: 'COMPLETED' });
      expect(result.statusLabel).toBe('구매완료');
    });
  });

  describe('mapSellHistoryItem', () => {
    const mockItem: TradeHistoryItem = {
      postId: 1,
      thumbnailUrl: '/test.jpg',
      title: '갤럭시 S24',
      price: 1500000,
      status: 'SALE',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    };

    it('SALE 상태면 판매중 라벨', () => {
      const result = mapSellHistoryItem({ ...mockItem, status: 'SALE' });
      expect(result.statusLabel).toBe('판매중');
    });

    it('RESERVED 상태면 예약중 라벨', () => {
      const result = mapSellHistoryItem({ ...mockItem, status: 'RESERVED' });
      expect(result.statusLabel).toBe('예약중');
    });

    it('COMPLETED 상태면 판매완료 라벨', () => {
      const result = mapSellHistoryItem({ ...mockItem, status: 'COMPLETED' });
      expect(result.statusLabel).toBe('판매완료');
    });
  });

  describe('mapWishlistPostItem', () => {
    const mockItem: WishlistPostItem = {
      postId: 1,
      title: '찜한 상품',
      price: 500000,
      imageUrl: '/wishlist.jpg',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10',
    };

    it('위시리스트 아이템 매핑', () => {
      const result = mapWishlistPostItem(mockItem);

      expect(result.id).toBe('1');
      expect(result.modelName).toBe('찜한 상품');
      expect(result.price).toBe('500,000원');
      expect(result.date).toBe('2024.01.10');
      expect(result.status).toBe('favorite');
      expect(result.favoriteActive).toBe(true);
      expect(result.imageUrl).toBe('/wishlist.jpg');
    });
  });

  describe('mapWishlistShopItem', () => {
    const mockItem: WishlistShopItem = {
      shopName: '애플 서비스센터 강남점',
      location: '서울시 강남구',
    };

    it('위시리스트 수리점 매핑', () => {
      const result = mapWishlistShopItem(mockItem, 0);

      expect(result.id).toBe('애플 서비스센터 강남점-0');
      expect(result.name).toBe('애플 서비스센터 강남점');
      expect(result.address).toBe('서울시 강남구');
      expect(result.favoriteActive).toBe(true);
    });

    it('index가 id에 포함됨', () => {
      const result1 = mapWishlistShopItem(mockItem, 5);
      expect(result1.id).toBe('애플 서비스센터 강남점-5');
    });
  });
});
