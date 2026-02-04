export type ChatTimelineItem =
  | { type: 'date'; id: string; label: string }
  | {
      type: 'message';
      id: string;
      role: 'sender' | 'receiver';
      message: string;
      meta?: string;
      metaDateTime?: string;
    };

export type ChatThread = {
  id: string;
  name: string;
  avatar?: string;
  preview: string;
  dateLabel: string;
  productThumbnail?: string;
  hasAlert?: boolean;
};

export type ProductInfo = {
  image?: string;
  title: string;
  price: string;
  date: string;
};

export type ThreadContent = {
  product: ProductInfo;
  timeline: ChatTimelineItem[];
};
