export const SELL_ENDPOINTS = {
  LIST: '/sell-post',
  ITEM: (postId: number | string) => `/sell-post/${postId}`,
  DETAIL: (postId: number | string) => `/sell-post/detail/${postId}`,
  BY_USER: (userId: number | string) => `/sell-post/${userId}`,
  RESERVE: '/sell-post/reserve',
  COMPLETE: '/sell-post/complete',
  ACTIVE: '/sell-post/active',
} as const;
