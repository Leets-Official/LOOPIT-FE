import type { TradeListItem } from '../ui/TradeItemList';
import type { RepairListItem } from '@shared/ui/RepairList';

export const MY_PAGE_PROFILE = {
  nickname: '폰박살',
  email: 'loveloopit@email.com',
  profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=320&auto=format&fit=crop',
};

export const PERSONAL_INFO_DEFAULTS = {
  nickname: '폰박살',
  name: '김민아',
  birthDate: '2001-11-11',
  email: 'loveloopit@email.com',
};

export const BUY_ITEMS: TradeListItem[] = [
  {
    id: 'buy-1',
    modelName: '아이폰 17 256GB 실버',
    price: '1,450,000원',
    date: '2026.02.09',
    status: 'buying',
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f999018b72?q=80&w=200&auto=format&fit=crop',
  },
];

export const SELL_ITEMS: TradeListItem[] = [
  {
    id: 'sell-1',
    modelName: '아이폰 16 프로 512GB',
    price: '1,320,000원',
    date: '2026.02.07',
    status: 'reserved',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'sell-2',
    modelName: '갤럭시 S26 울트라',
    price: '1,550,000원',
    date: '2026.01.30',
    status: 'completed',
    statusLabel: '판매완료',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=200&auto=format&fit=crop',
  },
];

export const FAVORITE_PRODUCT_ITEMS: TradeListItem[] = [
  {
    id: 'fav-product-1',
    modelName: '새제품 아이폰 17 256GB',
    price: '1,500,000원',
    date: '2026.02.08',
    status: 'favorite',
    favoriteActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'fav-product-2',
    modelName: '아이폰 17 (새제품, 케이스 증정)',
    price: '1,550,000원',
    date: '2026.02.07',
    status: 'favorite',
    favoriteActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f999018b72?q=80&w=200&auto=format&fit=crop',
  },
];

export const FAVORITE_REPAIR_ITEMS: RepairListItem[] = [
  {
    id: 'fav-repair-1',
    name: '뚝딱 핸드폰수리점',
    address: '서울시 강남구',
    favoriteActive: true,
  },
];
