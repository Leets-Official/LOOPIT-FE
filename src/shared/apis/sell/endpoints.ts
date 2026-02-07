export const SELL_ENDPOINTS = {
  LIST: '/sell-post',
  ITEM: (postId: number | string) => `/sell-post/${postId}`,
} as const;
