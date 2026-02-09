import type { SellFormData } from '@shared/utils/schemas';

export {
  BATTERY_OPTIONS,
  MANUFACTURER_OPTIONS,
  PRODUCT_CONDITION_OPTIONS,
  SCRATCH_OPTIONS,
  SCREEN_OPTIONS,
} from '@shared/constants';

export const TEXT_FIELDS = [
  { name: 'title', label: '제목', placeholder: '제목을 입력해 주세요' },
  { name: 'modelName', label: '모델명', placeholder: '모델명을 입력해 주세요' },
  { name: 'colorName', label: '색상', placeholder: '색상을 입력해 주세요' },
  { name: 'storageSize', label: '저장 용량', placeholder: '128GB' },
] as const satisfies ReadonlyArray<{ name: keyof SellFormData; label: string; placeholder: string }>;
