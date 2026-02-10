import { formatPrice, formatRelativeTime } from '@shared/utils';
import type { BuyPostApiItem, SimilarPost } from './types';
import type { BuyItem, SimilarItem } from '@shared/types/buy';

const parsePrice = (value?: number | string) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const numeric = Number(value.replace(/[^0-9]/g, ''));
    return Number.isNaN(numeric) ? 0 : numeric;
  }
  return 0;
};

const normalizeBrand = (value?: string, manufacturer?: string, model?: string, title?: string): BuyItem['brand'] => {
  const label = `${value ?? ''}${manufacturer ?? ''}${model ?? ''}${title ?? ''}`.toLowerCase();
  if (label.includes('삼성') || label.includes('samsung') || label.includes('갤럭시') || label.includes('galaxy')) {
    return 'samsung';
  }
  if (label.includes('애플') || label.includes('apple') || label.includes('아이폰') || label.includes('아이패드')) {
    return 'apple';
  }
  return 'apple';
};

const normalizeAvailability = (value?: boolean, status?: string, postStatus?: string) => {
  if (typeof value === 'boolean') {
    return value;
  }
  const label = (postStatus ?? status ?? '').toLowerCase();
  if (!label) {
    return true;
  }
  if (label.includes('판매중') || label.includes('selling')) {
    return true;
  }
  if (label.includes('complete') || label.includes('done') || label.includes('판매완료')) {
    return false;
  }
  if (label.includes('reserve') || label.includes('reserved') || label.includes('예약')) {
    return false;
  }
  return true;
};

const normalizeDescription = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value.filter((line) => typeof line === 'string');
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [] as string[];
};

const normalizeBatteryStatus = (value?: string): BuyItem['batteryStatus'] => {
  if (value === 'GREAT' || value === 'GOOD' || value === 'BAD') {
    return value;
  }
  return 'GREAT';
};

const mapSimilarPost = (post: SimilarPost): SimilarItem => ({
  id: String(post.id),
  title: post.title,
  priceLabel: formatPrice(post.price),
  dateLabel: formatRelativeTime(post.createdAt),
  image: post.thumbnail,
});

export const mapBuyPostToItem = (item: BuyPostApiItem): BuyItem => {
  const priceValue = parsePrice(item.price);
  const createdAt = item.createdAt;
  const modelName = item.model ?? '';
  const specs = item.specs ?? {
    manufacturer: item.manufacturer ?? '',
    model: modelName,
    color: item.color ?? '',
    storage: item.capacity ?? '',
    battery: item.batteryStatus ?? '',
  };

  return {
    id: String(item.id ?? ''),
    title: item.title ?? '제목 없음',
    priceLabel: priceValue ? formatPrice(priceValue) : '',
    priceValue,
    dateLabel: createdAt ? formatRelativeTime(createdAt) : '',
    image: item.thumbnail ?? item.imageUrls?.[0] ?? '',
    brand: normalizeBrand(item.brand, item.manufacturer, item.model, item.title),
    model: item.model ?? '',
    available: normalizeAvailability(undefined, item.status, item.postStatus),
    used: item.used ?? false,
    hasScratch: item.hasScratch ?? false,
    screenCracked: item.screenCracked ?? false,
    batteryStatus: normalizeBatteryStatus(item.batteryStatus),
    seller: {
      nickname: item.seller?.nickname ?? item.sellerNickname ?? '알 수 없음',
      profileImage: item.seller?.profileImage ?? item.sellerProfileImage,
    },
    specs: {
      manufacturer: specs.manufacturer ?? '',
      model: specs.model ?? '',
      color: specs.color ?? '',
      storage: specs.storage ?? '',
      battery: specs.battery ?? '',
    },
    description: normalizeDescription(item.content),
    similarItems: item.similarPosts?.map(mapSimilarPost),
    liked: item.liked ?? false,
    owner: item.owner ?? false,
  };
};
