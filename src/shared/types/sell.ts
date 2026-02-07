export type SellState = {
  postId?: number;
  title?: string;
  price?: string;
  manufacturer?: string | null;
  modelName?: string;
  colorName?: string;
  storageSize?: string;
  description?: string;
  imageFile?: File | null;
  imageUrl?: string | null;
  productCondition?: 'new' | 'used';
  scratchCondition?: 'scratch' | 'clean';
  screenCondition?: 'broken' | 'clean';
  batteryCondition?: '80plus' | '80minus' | '50minus';
};
