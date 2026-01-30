export type BuyItem = {
  id: string;
  title: string;
  priceLabel: string;
  priceValue: number;
  dateLabel: string;
  image: string;
  brand: 'apple' | 'samsung';
  model: string;
  available: boolean;
  condition: 'new' | 'used';
  scratch: 'scratch' | 'clean';
  screenCrack: 'broken' | 'clean';
  battery: '80plus' | '80minus' | '50minus';
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
};
