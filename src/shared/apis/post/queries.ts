import { chatKeys } from '@shared/apis/chat/keys';
import { mypageKeys } from '@shared/apis/mypage/keys';
import { useAuthStore } from '@shared/stores';
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  activePost,
  completePost,
  createPost,
  deletePost,
  getBuyAutocomplete,
  getPostById,
  getPostListByCondition,
  getSellAutocomplete,
  getSellerPosts,
  reservePost,
  updatePost,
} from './api';
import { postKeys } from './keys';
import type {
  ActivePostRequest,
  CompletePostRequest,
  CreatePostRequest,
  PostListCondition,
  ReservePostRequest,
  UpdatePostRequest,
} from './types';

// 게시글 목록 조회 (무한 스크롤)
export const useInfinitePostListQuery = (params: PostListCondition = {}) => {
  return useInfiniteQuery({
    queryKey: postKeys.infinite(params),
    queryFn: ({ pageParam = 0 }) => getPostListByCondition({ ...params, page: pageParam }),
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

// 게시글 상세 조회
export const usePostQuery = (id?: string | number) => {
  const { accessToken, _hasHydrated } = useAuthStore();
  // 하이드레이션 전에는 서버와 동일하게 false 사용
  const isAuthenticated = _hasHydrated && Boolean(accessToken);

  return useQuery({
    queryKey: postKeys.detail(id, isAuthenticated),
    queryFn: () => getPostById(id!),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};

// 게시글 생성
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreatePostRequest) => createPost(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

// 게시글 수정
export const useUpdatePostMutation = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdatePostRequest) => updatePost(postId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detailBase(postId) });
    },
  });
};

// 게시글 삭제
export const useDeletePostMutation = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postKeys.detailBase(postId) });
      queryClient.removeQueries({ queryKey: postKeys.lists() });
    },
  });
};

// 상태 변경: 예약
export const useReservePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ReservePostRequest) => reservePost(request),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: postKeys.infiniteBase() });
      queryClient.invalidateQueries({ queryKey: postKeys.detailBase(variables.postId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.roomByPost(variables.postId) });
      queryClient.invalidateQueries({ queryKey: mypageKeys.all });
    },
  });
};

// 상태 변경: 거래 완료
export const useCompletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CompletePostRequest) => completePost(request),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: postKeys.infiniteBase() });
      queryClient.invalidateQueries({ queryKey: postKeys.detailBase(variables.postId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.roomByPost(variables.postId) });
      queryClient.invalidateQueries({ queryKey: mypageKeys.all });
    },
  });
};

// 상태 변경: 다시 판매중
export const useActivePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ActivePostRequest) => activePost(request),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: postKeys.infiniteBase() });
      queryClient.invalidateQueries({ queryKey: postKeys.detailBase(variables.postId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.roomByPost(variables.postId) });
      queryClient.invalidateQueries({ queryKey: mypageKeys.all });
    },
  });
};

// 판매자 게시글 조회 (무한 스크롤)
export const useInfiniteSellerPostsQuery = (postId: number | string) => {
  return useInfiniteQuery({
    queryKey: postKeys.sellerInfinite(postId),
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

// 검색 자동완성 (구매)
export const useBuyAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: postKeys.buyAutocomplete(keyword),
    queryFn: () => getBuyAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// 검색 자동완성 (판매)
export const useSellAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: postKeys.sellAutocomplete(keyword),
    queryFn: () => getSellAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
