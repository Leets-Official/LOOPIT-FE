import type { SellState } from '@shared/types/sell';
import type { SellFormData } from '@shared/utils/schemas';
import type { DefaultValues } from 'react-hook-form';

export const getSellFormDefaults = (): DefaultValues<SellFormData> => ({
  imageFile: null,
  title: '',
  price: '',
  manufacturer: '',
  modelName: '',
  colorName: '',
  storageSize: '',
  description: '',
  productCondition: false,
  scratchCondition: true,
  screenCondition: true,
  batteryCondition: 'GREAT',
});

export const mapSellDraftToForm = (state: SellState): DefaultValues<SellFormData> => ({
  imageFile: null,
  title: state.title ?? '',
  price: state.price ?? '',
  manufacturer: state.manufacturer ?? '',
  modelName: state.modelName ?? '',
  colorName: state.colorName ?? '',
  storageSize: state.storageSize ?? '',
  description: state.description ?? '',
  productCondition: state.productCondition ?? false,
  scratchCondition: state.scratchCondition ?? false,
  screenCondition: state.screenCondition ?? false,
  batteryCondition: state.batteryCondition ?? 'GREAT',
});
