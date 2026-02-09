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
  productCondition?: boolean;
  scratchCondition?: boolean;
  screenCondition?: boolean;
  batteryCondition?: 'GREAT' | 'GOOD' | 'BAD';
};
