export type SimilarItem = {
  id: string;
  title: string;
  priceLabel: string;
  dateLabel: string;
  image: string;
};

export type BuyItem = {
  id: string;
  title: string;
  priceLabel: string;
  priceValue: number;
  dateLabel: string;
  image: string;
  imageUrls: string[];
  brand: 'apple' | 'samsung';
  model: string;
  available: boolean;
  used: boolean;
  hasScratch: boolean;
  screenCracked: boolean;
  batteryStatus: 'GREAT' | 'GOOD' | 'BAD';
  seller: {
    nickname: string;
    profileImage?: string;
  };
  specs: {
    manufacturer: string;
    model: string;
    color: string;
    storage: string;
    battery: string;
  };
  description: string[];
  similarItems?: SimilarItem[];
  liked: boolean;
  owner: boolean;
};
