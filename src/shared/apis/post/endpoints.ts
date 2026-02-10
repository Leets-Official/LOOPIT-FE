// 게시글 관련 엔드포인트
export const POST_ENDPOINTS = {
  LIST: '/sell-post',
  DETAIL: '/sell-post/detail',
  ITEM: (postId: number | string) => `/sell-post/${postId}`,
  RESERVE: '/sell-post/reserve',
  COMPLETE: '/sell-post/complete',
  ACTIVE: '/sell-post/active',
  SELLER: '/sell-post/seller',
  AUTOCOMPLETE_BUY: '/search/autocomplete/buy',
  AUTOCOMPLETE_SELL: '/search/autocomplete/sell',
} as const;
