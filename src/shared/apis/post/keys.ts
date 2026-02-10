// 게시글 관련 쿼리 키
export const postKeys = {
  all: ['post'] as const,

  // 목록/상세
  lists: () => [...postKeys.all, 'list'] as const,
  infinite: (params?: { manufacturer?: string; series?: string[]; priceRange?: string; keyword?: string }) =>
    [
      ...postKeys.all,
      'infinite',
      params?.manufacturer ?? '',
      params?.series?.join(',') ?? '',
      params?.priceRange ?? '',
      params?.keyword ?? '',
    ] as const,
  detail: (id?: string | number) => [...postKeys.all, 'detail', id] as const,

  // 검색 자동완성
  buyAutocomplete: (keyword: string) => [...postKeys.all, 'buyAutocomplete', keyword] as const,
  sellAutocomplete: (keyword: string) => [...postKeys.all, 'sellAutocomplete', keyword] as const,

  // 판매자 게시글
  sellerInfinite: (postId: number | string) => [...postKeys.all, 'seller', 'infinite', postId] as const,
};
