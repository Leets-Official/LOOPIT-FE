export const wishlistKeys = {
  all: ['wishlist'] as const,
  shopList: () => [...wishlistKeys.all, 'shopList'] as const,
  postList: () => [...wishlistKeys.all, 'postList'] as const,
};
