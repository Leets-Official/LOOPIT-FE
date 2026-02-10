export const SELL_ENDPOINTS = {
  LIST: '/sell-post',
  ITEM: (postId: number | string) => `/sell-post/${postId}`,
  AUTOCOMPLETE: '/search/autocomplete/sell',
  RESERVE: '/sell-post/reserve',
  COMPLETE: '/sell-post/complete',
  ACTIVE: '/sell-post/active',
} as const;
