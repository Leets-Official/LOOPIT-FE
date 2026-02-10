import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkShopWishlist, toggleShopWishlist } from './api';
import { repairKeys } from './keys';
import type { ShopWishlistStatus, ToggleShopWishlistRequest } from './types';
import { wishlistKeys } from '@shared/apis/wishlist';

export const useCheckShopWishlistQuery = (shopNames: string[]) => {
  const { accessToken, _hasHydrated } = useAuthStore();
  const isLoggedIn = _hasHydrated && Boolean(accessToken);

  return useQuery({
    queryKey: repairKeys.wishlistCheck(shopNames),
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
      await queryClient.cancelQueries({ queryKey: repairKeys.all });

      const previousQueries = queryClient.getQueriesData<ShopWishlistStatus[]>({
        queryKey: repairKeys.all,
      });

      queryClient.setQueriesData<ShopWishlistStatus[]>({ queryKey: repairKeys.all }, (old) => {
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
      queryClient.invalidateQueries({ queryKey: repairKeys.all });
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
  });
};
