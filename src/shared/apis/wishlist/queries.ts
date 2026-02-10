import { useAuthStore } from '@shared/stores';
import { useQuery } from '@tanstack/react-query';
import { getWishlistPosts, getWishlistShops } from './api';
import { wishlistKeys } from './keys';
import type { WishlistPostItem, WishlistShopItem } from './types';

export const useWishlistShopListQuery = () => {
  const { _hasHydrated } = useAuthStore();

  return useQuery<WishlistShopItem[]>({
    queryKey: wishlistKeys.shopList(),
    queryFn: getWishlistShops,
    enabled: _hasHydrated,
    staleTime: 60 * 1000,
  });
};

export const useWishlistPostListQuery = () => {
  const { _hasHydrated } = useAuthStore();

  return useQuery<WishlistPostItem[]>({
    queryKey: wishlistKeys.postList(),
    queryFn: getWishlistPosts,
    enabled: _hasHydrated,
    staleTime: 60 * 1000,
  });
};
