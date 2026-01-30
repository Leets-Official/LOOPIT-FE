import { BATTERY_OPTIONS, PRODUCT_CONDITION_OPTIONS, SCRATCH_OPTIONS, SCREEN_OPTIONS } from '@pages/sell/model/options';
import type { BuyItem } from '@shared/types/buy';

export const buildDetailInfo = (item: BuyItem) => {
  const conditionLabel =
    PRODUCT_CONDITION_OPTIONS.find((option) => option.value === item.condition)?.label.split('-')[0] ?? '';
  const scratchLabel = SCRATCH_OPTIONS.find((option) => option.value === item.scratch)?.label ?? '';
  const crackLabel = SCREEN_OPTIONS.find((option) => option.value === item.screenCrack)?.label ?? '';
  const batteryLabel = BATTERY_OPTIONS.find((option) => option.value === item.battery)?.label ?? '';

  return [conditionLabel, scratchLabel, crackLabel, batteryLabel].join(' · ');
};
