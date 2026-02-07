import type { CreateSellPostRequest } from '@shared/apis/sell';
import type { SellFormData } from '@shared/utils/schemas';

export const buildSellPostRequest = (form: SellFormData, imageUrl: string): CreateSellPostRequest => {
  const batteryStatus: CreateSellPostRequest['batteryStatus'] =
    form.batteryCondition === '80plus' ? 'GREAT' : form.batteryCondition === '80minus' ? 'GOOD' : 'BAD';

  return {
    title: form.title,
    manufacturer: form.manufacturer,
    model: form.modelName,
    color: form.colorName,
    capacity: form.storageSize,
    price: Number(form.price),
    description: form.description,
    imageUrls: [imageUrl],
    hasScratch: form.scratchCondition === 'scratch',
    batteryStatus,
    screenCracked: form.screenCondition === 'broken',
    used: form.productCondition === 'used',
  };
};
