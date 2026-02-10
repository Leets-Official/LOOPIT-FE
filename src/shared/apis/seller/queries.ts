import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getSellerPosts } from './api';
import { sellerKeys } from './keys';

export const useInfiniteSellerPostsQuery = (postId: number | string) => {
  return useInfiniteQuery({
    queryKey: sellerKeys.infinite(postId),
    queryFn: ({ pageParam = 0 }) => getSellerPosts({ postId, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.sellPosts.last) {
        return undefined;
      }
      return lastPage.sellPosts.number + 1;
    },
    initialPageParam: 0,
    enabled: Boolean(postId),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
