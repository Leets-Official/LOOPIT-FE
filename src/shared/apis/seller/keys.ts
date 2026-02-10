export const sellerKeys = {
  all: ['seller'] as const,
  infinite: (postId: number | string) => [...sellerKeys.all, 'infinite', postId] as const,
};
