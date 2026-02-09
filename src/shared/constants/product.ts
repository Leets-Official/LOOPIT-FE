export const MANUFACTURER_OPTIONS = ['삼성', '애플'] as const;

export const PRODUCT_CONDITION_OPTIONS = [
  { label: '미개봉-새상품', value: false },
  { label: '개봉-중고', value: true },
] as const;

export const SCRATCH_OPTIONS = [
  { label: '스크래치 있음', value: true },
  { label: '스크래치 없음', value: false },
] as const;

export const SCREEN_OPTIONS = [
  { label: '화면 깨짐', value: true },
  { label: '화면 깨짐 없음', value: false },
] as const;

export const BATTERY_OPTIONS = [
  { label: '배터리 성능 80% 이상', value: 'GREAT' },
  { label: '배터리 성능 80% 미만', value: 'GOOD' },
  { label: '배터리 성능 50% 미만', value: 'BAD' },
] as const;
