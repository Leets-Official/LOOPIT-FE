import type { CreatePostRequest } from '@shared/apis/post';
import type { SellFormData } from '@shared/utils/schemas';

export const buildSellPostRequest = (form: SellFormData, imageUrls: string[]): CreatePostRequest => ({
  title: form.title,
  manufacturer: form.manufacturer,
  model: form.modelName,
  color: form.colorName,
  capacity: form.storageSize,
  price: Number(form.price),
  description: form.description,
  imageUrls,
  hasScratch: form.scratchCondition,
  batteryStatus: form.batteryCondition,
  screenCracked: form.screenCondition,
  used: form.productCondition,
});
