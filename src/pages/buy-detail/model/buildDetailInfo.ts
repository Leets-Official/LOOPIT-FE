import { BATTERY_OPTIONS, PRODUCT_CONDITION_OPTIONS, SCRATCH_OPTIONS, SCREEN_OPTIONS } from '@shared/constants';
import type { BuyItem } from '@shared/types/post';

export const buildDetailInfo = (item: BuyItem) => {
  const conditionLabel =
    PRODUCT_CONDITION_OPTIONS.find((option) => option.value === item.used)?.label.split('-')[0] ?? '';
  const scratchLabel = SCRATCH_OPTIONS.find((option) => option.value === item.hasScratch)?.label ?? '';
  const crackLabel = SCREEN_OPTIONS.find((option) => option.value === item.screenCracked)?.label ?? '';
  const batteryLabel = BATTERY_OPTIONS.find((option) => option.value === item.batteryStatus)?.label ?? '';

  return [conditionLabel, scratchLabel, crackLabel, batteryLabel].join(' · ');
};
