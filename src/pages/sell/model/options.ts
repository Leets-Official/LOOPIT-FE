import type { SellFormData } from '@shared/utils/schemas';

export const MANUFACTURER_OPTIONS = ['삼성', '애플'] as const;

export const TEXT_FIELDS = [
  { name: 'title', label: '제목', placeholder: '제목을 입력해 주세요' },
  { name: 'modelName', label: '모델명', placeholder: '모델명을 입력해 주세요' },
  { name: 'colorName', label: '색상', placeholder: '색상을 입력해 주세요' },
  { name: 'storageSize', label: '저장 용량', placeholder: '128GB' },
] as const satisfies ReadonlyArray<{ name: keyof SellFormData; label: string; placeholder: string }>;

export const PRODUCT_CONDITION_OPTIONS = [
  { label: '미개봉-새상품', value: 'new' },
  { label: '개봉-중고', value: 'used' },
] as const;

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
