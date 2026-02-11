import { postKeys } from '@shared/apis/post';
import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkShopWishlist, getWishlistPosts, getWishlistShops, togglePostWishlist, toggleShopWishlist } from './api';
import { wishlistKeys } from './keys';
import type { ShopWishlistStatus, ToggleShopWishlistRequest, WishlistPostItem, WishlistShopItem } from './types';
import type { BuyItem } from '@shared/types/post';

// Shop wishlist queries
export const useWishlistShopListQuery = () => {
  const { _hasHydrated } = useAuthStore();

  return useQuery<WishlistShopItem[]>({
    queryKey: wishlistKeys.shopList(),
    queryFn: getWishlistShops,
    enabled: _hasHydrated,
    staleTime: 60 * 1000,
  });
};

export const useCheckShopWishlistQuery = (shopNames: string[]) => {
  const { accessToken, _hasHydrated } = useAuthStore();
  const isLoggedIn = _hasHydrated && Boolean(accessToken);

  return useQuery({
    queryKey: wishlistKeys.shopCheck(shopNames),
    queryFn: () => checkShopWishlist({ shopNames }),
    enabled: isLoggedIn && shopNames.length > 0,
    staleTime: 60 * 1000,
  });
};

export const useToggleShopWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ToggleShopWishlistRequest) => toggleShopWishlist(request),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: wishlistKeys.all });

      const previousQueries = queryClient.getQueriesData<ShopWishlistStatus[]>({
        queryKey: wishlistKeys.all,
      });

      queryClient.setQueriesData<ShopWishlistStatus[]>({ queryKey: wishlistKeys.all }, (old) => {
        if (!old) {
          return old;
        }
        return old.map((item) =>
          item.shopName === variables.shopName ? { ...item, shopInWishList: !item.shopInWishList } : item
        );
      });

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
  });
};

// Post wishlist queries
export const useWishlistPostListQuery = () => {
  const { _hasHydrated } = useAuthStore();

  return useQuery<WishlistPostItem[]>({
    queryKey: wishlistKeys.postList(),
    queryFn: getWishlistPosts,
    enabled: _hasHydrated,
    staleTime: 60 * 1000,
  });
};

export const useTogglePostWishlistMutation = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = Boolean(useAuthStore.getState().accessToken);

  return useMutation({
    mutationFn: (postId: string) => togglePostWishlist({ postId: Number(postId) }),
    onMutate: async (postId) => {
      const queryKey = postKeys.detail(postId, isAuthenticated);
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<BuyItem>(queryKey);

      queryClient.setQueryData<BuyItem>(queryKey, (old) => (old ? { ...old, liked: !old.liked } : old));

      return { previous, postId };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(postKeys.detail(context.postId, isAuthenticated), context.previous);
      }
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detailBase(postId) });
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
  });
};
