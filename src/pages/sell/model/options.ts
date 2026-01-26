export const MANUFACTURER_OPTIONS = ['삼성', '애플'] as const;

export const SCRATCH_OPTIONS = [
  { label: '스크래치 있음', value: 'scratch' },
  { label: '스크래치 없음', value: 'clean' },
] as const;

export const SCREEN_OPTIONS = [
  { label: '화면 깨짐', value: 'broken' },
  { label: '화면 깨짐 없음', value: 'clean' },
] as const;

export const BATTERY_OPTIONS = [
  { label: '배터리 성능 80% 이상', value: '80plus' },
  { label: '배터리 성능 80% 미만', value: '80minus' },
  { label: '배터리 성능 50% 미만', value: '50minus' },
] as const;
