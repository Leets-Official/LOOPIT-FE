import { wishlistKeys } from '@shared/apis/wishlist';
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBuyAutocomplete, getBuyItemById, getBuyItemsByCondition, togglePostWishlist } from './api';
import { buyKeys } from './keys';
import type { BuyListCondition } from './types';
import type { BuyItem } from '@shared/types/buy';

export const useInfiniteBuyItemsQuery = (params: BuyListCondition = {}) => {
  return useInfiniteQuery({
    queryKey: buyKeys.infinite(params),
    queryFn: ({ pageParam = 0 }) => getBuyItemsByCondition({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    initialPageParam: 0,
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useBuyItemQuery = (id?: string | number) => {
  return useQuery({
    queryKey: buyKeys.detail(id),
    queryFn: () => getBuyItemById(id!),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};

export const useBuyAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: buyKeys.autocomplete(keyword),
    queryFn: () => getBuyAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useTogglePostWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => togglePostWishlist({ postId: Number(postId) }),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: buyKeys.detail(postId) });
      const previous = queryClient.getQueryData<BuyItem>(buyKeys.detail(postId));

      queryClient.setQueryData<BuyItem>(buyKeys.detail(postId), (old) => (old ? { ...old, liked: !old.liked } : old));

      return { previous, postId };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(buyKeys.detail(context.postId), context.previous);
      }
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: buyKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
  });
};
