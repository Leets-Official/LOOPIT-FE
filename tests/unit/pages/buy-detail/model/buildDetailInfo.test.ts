import { buildDetailInfo } from '@pages/buy-detail/model/buildDetailInfo';
import type { BuyItem } from '@shared/types/buy';

describe('buildDetailInfo', () => {
  const createMockItem = (overrides: Partial<BuyItem> = {}): BuyItem => ({
    id: '1',
    title: '테스트 상품',
    image: '/test.jpg',
    priceLabel: '1,000,000원',
    priceValue: 1000000,
    brand: '애플',
    model: '아이폰 15',
    createdAt: '2024-01-15',
    used: true,
    hasScratch: false,
    screenCracked: false,
    batteryStatus: 'GREAT',
    ...overrides,
  });

  it('모든 조건 정보를 조합하여 반환', () => {
    const item = createMockItem({
      used: true,
      hasScratch: true,
      screenCracked: false,
      batteryStatus: 'GREAT',
    });

    const result = buildDetailInfo(item);

    expect(result).toBe('개봉 · 스크래치 있음 · 화면 깨짐 없음 · 배터리 성능 80% 이상');
  });

  it('미개봉 상품', () => {
    const item = createMockItem({
      used: false,
      hasScratch: false,
      screenCracked: false,
      batteryStatus: 'GREAT',
    });

    const result = buildDetailInfo(item);

    expect(result).toContain('미개봉');
  });

  it('스크래치 없음', () => {
    const item = createMockItem({
      hasScratch: false,
    });

    const result = buildDetailInfo(item);

    expect(result).toContain('스크래치 없음');
  });

  it('화면 깨짐', () => {
    const item = createMockItem({
      screenCracked: true,
    });

    const result = buildDetailInfo(item);

    expect(result).toContain('화면 깨짐');
  });

  it('배터리 성능 80% 미만', () => {
    const item = createMockItem({
      batteryStatus: 'GOOD',
    });

    const result = buildDetailInfo(item);

    expect(result).toContain('배터리 성능 80% 미만');
  });

  it('배터리 성능 50% 미만', () => {
    const item = createMockItem({
      batteryStatus: 'BAD',
    });

    const result = buildDetailInfo(item);

    expect(result).toContain('배터리 성능 50% 미만');
  });

  it('구분자(·)로 연결됨', () => {
    const item = createMockItem();
    const result = buildDetailInfo(item);

    expect(result.split(' · ')).toHaveLength(4);
  });
});
