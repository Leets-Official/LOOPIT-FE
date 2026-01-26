import type { SellFormData } from '@shared/utils/schemas';
import type { SellState } from '@shared/types/sell';
import type { DefaultValues } from 'react-hook-form';

export const getSellFormDefaults = (): DefaultValues<SellFormData> => ({
  title: '',
  price: '',
  manufacturer: '',
  modelName: '',
  colorName: '',
  storageSize: '',
  description: '',
  productCondition: 'new',
  scratchCondition: 'scratch',
  screenCondition: 'broken',
  batteryCondition: '80plus',
});

export const mapSellDraftToForm = (state: SellState): DefaultValues<SellFormData> => ({
  title: state.title ?? '',
  price: state.price ?? '',
  manufacturer: state.manufacturer ?? '',
  modelName: state.modelName ?? '',
  colorName: state.colorName ?? '',
  storageSize: state.storageSize ?? '',
  description: state.description ?? '',
  productCondition: state.productCondition ?? 'new',
  scratchCondition: state.scratchCondition ?? 'scratch',
  screenCondition: state.screenCondition ?? 'broken',
  batteryCondition: state.batteryCondition ?? '80plus',
});
