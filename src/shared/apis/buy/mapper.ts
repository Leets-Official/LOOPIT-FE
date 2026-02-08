import type { BuyPostApiItem } from './types';
import type { BuyItem } from '@shared/types/buy';

const formatPriceLabel = (price: number) => `${new Intl.NumberFormat('ko-KR').format(price)}원`;

const formatDateLabel = (dateString?: string) => {
  if (!dateString) {
    return '';
  }
  const createdAt = new Date(dateString);
  if (Number.isNaN(createdAt.getTime())) {
    return '';
  }
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)}분 전`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
};

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

const normalizeCondition = (
  value?: string | boolean,
  fallback: BuyItem['condition'] = 'used'
): BuyItem['condition'] => {
  if (typeof value === 'boolean') {
    return value ? 'used' : 'new';
  }
  if (!value) {
    return fallback;
  }
  const label = value.toLowerCase();
  if (label.includes('new')) {
    return 'new';
  }
  if (label.includes('used')) {
    return 'used';
  }
  return fallback;
};

const normalizeScratch = (value?: string | boolean, fallback: BuyItem['scratch'] = 'clean'): BuyItem['scratch'] => {
  if (typeof value === 'boolean') {
    return value ? 'scratch' : 'clean';
  }
  if (!value) {
    return fallback;
  }
  const label = value.toLowerCase();
  if (label.includes('scratch')) {
    return 'scratch';
  }
  if (label.includes('clean')) {
    return 'clean';
  }
  return fallback;
};

const normalizeScreen = (
  value?: string | boolean,
  fallback: BuyItem['screenCrack'] = 'clean'
): BuyItem['screenCrack'] => {
  if (typeof value === 'boolean') {
    return value ? 'broken' : 'clean';
  }
  if (!value) {
    return fallback;
  }
  const label = value.toLowerCase();
  if (label.includes('broken')) {
    return 'broken';
  }
  if (label.includes('clean')) {
    return 'clean';
  }
  return fallback;
};

const normalizeBattery = (value?: string, fallback: BuyItem['battery'] = '80plus'): BuyItem['battery'] => {
  if (!value) {
    return fallback;
  }
  const label = value.toLowerCase();
  if (label.includes('great')) {
    return '80plus';
  }
  if (label.includes('good')) {
    return '80minus';
  }
  if (label.includes('bad')) {
    return '50minus';
  }
  if (label.includes('50')) {
    return '50minus';
  }
  if (label.includes('80-') || label.includes('80minus')) {
    return '80minus';
  }
  if (label.includes('80+') || label.includes('80plus')) {
    return '80plus';
  }
  return fallback;
};

const normalizeModelId = (value?: string) => {
  if (!value) {
    return '';
  }
  if (value.includes('플립4')) {
    return 'galaxy-flip4';
  }
  if (value.includes('플립5')) {
    return 'galaxy-flip5';
  }
  if (value.includes('폴드')) {
    return 'galaxy-fold';
  }

  const normalized = value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  if (normalized.includes('iphone-17')) {
    return 'iphone-17';
  }
  if (normalized.includes('iphone-15')) {
    return 'iphone-15';
  }
  if (normalized.includes('iphone-14')) {
    return 'iphone-14';
  }
  if (normalized.includes('iphone-13')) {
    return 'iphone-13';
  }
  if (normalized.includes('iphone-12')) {
    return 'iphone-12';
  }
  if (normalized.includes('ipad-pro')) {
    return 'ipad-pro';
  }
  if (normalized.includes('flip4')) {
    return 'galaxy-flip4';
  }
  if (normalized.includes('flip5')) {
    return 'galaxy-flip5';
  }
  if (normalized.includes('galaxy-s20')) {
    return 'galaxy-s20';
  }
  if (normalized.includes('galaxy-fold')) {
    return 'galaxy-fold';
  }

  return normalized;
};

const normalizeAvailability = (value?: boolean, status?: string) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (!status) {
    return true;
  }
  const label = status.toLowerCase();
  if (label.includes('complete') || label.includes('done')) {
    return false;
  }
  if (label.includes('reserve') || label.includes('reserved')) {
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
    priceLabel: priceValue ? formatPriceLabel(priceValue) : '',
    priceValue,
    dateLabel: formatDateLabel(createdAt),
    image: item.thumbnail ?? item.imageUrls?.[0] ?? '',
    brand: normalizeBrand(item.brand, item.manufacturer, item.model, item.title),
    model: item.model ?? normalizeModelId(modelName),
    available: normalizeAvailability(undefined, item.status),
    condition: normalizeCondition(item.used),
    scratch: normalizeScratch(item.hasScratch),
    screenCrack: normalizeScreen(item.screenCracked),
    battery: normalizeBattery(item.batteryStatus),
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
    description: normalizeDescription(item.description),
  };
};
