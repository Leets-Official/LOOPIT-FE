import { filterBuyItems } from '@pages/buy/model/filterBuyItems';
import type { BuyItem } from '@shared/types/buy';

describe('filterBuyItems', () => {
  const mockItems: BuyItem[] = [
    {
      id: '1',
      title: '아이폰 15 프로 팝니다',
      image: '/img1.jpg',
      priceLabel: '1,200,000원',
      priceValue: 1200000,
      brand: '애플',
      model: '아이폰 15 Pro',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: '갤럭시 S24 울트라',
      image: '/img2.jpg',
      priceLabel: '1,500,000원',
      priceValue: 1500000,
      brand: '삼성',
      model: '갤럭시 S24 Ultra',
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      title: '아이폰 14 저렴히 판매',
      image: '/img3.jpg',
      priceLabel: '800,000원',
      priceValue: 800000,
      brand: '애플',
      model: '아이폰 14',
      createdAt: '2024-01-13',
    },
    {
      id: '4',
      title: '갤럭시 Z 폴드5',
      image: '/img4.jpg',
      priceLabel: '2,100,000원',
      priceValue: 2100000,
      brand: '삼성',
      model: '갤럭시 Z 폴드5',
      createdAt: '2024-01-12',
    },
  ];

  const defaultParams = {
    items: mockItems,
    query: '',
    selectedManufacturers: [],
    selectedModels: [],
    selectedPrices: [],
  };

  describe('필터 없음', () => {
    it('모든 필터가 비어있으면 전체 아이템 반환', () => {
      const result = filterBuyItems(defaultParams);
      expect(result).toHaveLength(4);
    });
  });

  describe('제조사 필터', () => {
    it('애플 제조사 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플'],
      });
      expect(result).toHaveLength(2);
      expect(result.every((item) => item.brand === '애플')).toBe(true);
    });

    it('삼성 제조사 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['삼성'],
      });
      expect(result).toHaveLength(2);
      expect(result.every((item) => item.brand === '삼성')).toBe(true);
    });

    it('복수 제조사 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플', '삼성'],
      });
      expect(result).toHaveLength(4);
    });
  });

  describe('모델 필터', () => {
    it('특정 모델 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedModels: ['iphone-15'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].model).toBe('아이폰 15 Pro');
    });

    it('갤럭시 S24 시리즈 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedModels: ['galaxy-s24'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].model).toBe('갤럭시 S24 Ultra');
    });
  });

  describe('가격 필터', () => {
    it('100만원 이하 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['under-100'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeLessThan(1000000);
    });

    it('100~130만원 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['100-130'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeGreaterThanOrEqual(1000000);
      expect(result[0].priceValue).toBeLessThan(1300000);
    });

    it('200만원 이상 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['200+'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeGreaterThanOrEqual(2000000);
    });

    it('복수 가격대 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['under-100', '200+'],
      });
      expect(result).toHaveLength(2);
    });
  });

  describe('검색어 필터', () => {
    it('제목에 포함된 검색어로 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        query: '아이폰',
      });
      expect(result).toHaveLength(2);
    });

    it('공백 검색어는 전체 반환', () => {
      const result = filterBuyItems({
        ...defaultParams,
        query: '   ',
      });
      expect(result).toHaveLength(4);
    });

    it('매칭 없는 검색어는 빈 배열 반환', () => {
      const result = filterBuyItems({
        ...defaultParams,
        query: '없는상품',
      });
      expect(result).toHaveLength(0);
    });
  });

  describe('복합 필터', () => {
    it('제조사 + 가격 필터 조합', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플'],
        selectedPrices: ['under-100'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('애플');
      expect(result[0].priceValue).toBeLessThan(1000000);
    });

    it('제조사 + 검색어 필터 조합', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플'],
        query: '15',
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('15');
    });
  });

  describe('skipServerSyncedFilters 모드', () => {
    it('skipServerSyncedFilters가 true면 applyManufacturerFilter에 따라 필터 적용', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플'],
        skipServerSyncedFilters: true,
        applyManufacturerFilter: true,
      });
      expect(result).toHaveLength(2);
    });

    it('skipServerSyncedFilters가 true이고 applyManufacturerFilter가 false면 제조사 필터 무시', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['애플'],
        skipServerSyncedFilters: true,
        applyManufacturerFilter: false,
      });
      expect(result).toHaveLength(4);
    });
  });
});
