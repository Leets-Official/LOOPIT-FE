import { filterBuyItems } from '@pages/buy/model/filterBuyItems';
import type { BuyItem } from '@shared/types/post';

describe('filterBuyItems', () => {
  const mockItems = [
    {
      title: '아이폰 15 프로 팝니다',
      priceValue: 250000,
      brand: 'apple',
      model: '아이폰 15 Pro',
    },
    {
      title: '갤럭시 S24 울트라',
      priceValue: 500000,
      brand: 'samsung',
      model: '갤럭시 S24 Ultra',
    },
    {
      title: '아이폰 14 저렴히 판매',
      priceValue: 80000,
      brand: 'apple',
      model: '아이폰 14',
    },
    {
      title: '갤럭시 Z 폴드5',
      priceValue: 1200000,
      brand: 'samsung',
      model: '갤럭시 Z 폴드5',
    },
  ] as BuyItem[];

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
        selectedManufacturers: ['apple'],
      });
      expect(result).toHaveLength(2);
      expect(result.every((item) => item.brand === 'apple')).toBe(true);
    });

    it('삼성 제조사 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['samsung'],
      });
      expect(result).toHaveLength(2);
      expect(result.every((item) => item.brand === 'samsung')).toBe(true);
    });

    it('복수 제조사 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['apple', 'samsung'],
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
    it('10만원 이하 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['under-10'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeLessThan(100000);
    });

    it('10~30만원 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['10-30'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeGreaterThanOrEqual(100000);
      expect(result[0].priceValue).toBeLessThan(400000);
    });

    it('100만원 이상 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['100+'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].priceValue).toBeGreaterThanOrEqual(1000000);
    });

    it('복수 가격대 필터링', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedPrices: ['under-10', '100+'],
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
        selectedManufacturers: ['apple'],
        selectedPrices: ['under-10'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].brand).toBe('apple');
      expect(result[0].priceValue).toBeLessThan(100000);
    });

    it('제조사 + 검색어 필터 조합', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['apple'],
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
        selectedManufacturers: ['apple'],
        skipServerSyncedFilters: true,
        applyManufacturerFilter: true,
      });
      expect(result).toHaveLength(2);
    });

    it('skipServerSyncedFilters가 true이고 applyManufacturerFilter가 false면 제조사 필터 무시', () => {
      const result = filterBuyItems({
        ...defaultParams,
        selectedManufacturers: ['apple'],
        skipServerSyncedFilters: true,
        applyManufacturerFilter: false,
      });
      expect(result).toHaveLength(4);
    });
  });
});
