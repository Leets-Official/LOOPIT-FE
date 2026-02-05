import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  activateSellPost,
  completeSellPost,
  createSellPost,
  deleteSellPost,
  getSellPostDetail,
  getSellPosts,
  getSellPostsByUser,
  reserveSellPost,
  updateSellPost,
} from './api';
import { sellKeys } from './keys';
import type { CreateSellPostRequest, SellPostActionRequest, UpdateSellPostRequest } from './types';

export const useSellPostsQuery = () => {
  return useQuery({
    queryKey: sellKeys.list(),
    queryFn: getSellPosts,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useSellPostDetailQuery = (postId: number | string) => {
  return useQuery({
    queryKey: sellKeys.detail(postId),
    queryFn: () => getSellPostDetail(postId),
    enabled: Boolean(postId),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useSellPostsByUserQuery = (userId: number | string) => {
  return useQuery({
    queryKey: sellKeys.byUser(userId),
    queryFn: () => getSellPostsByUser(userId),
    enabled: Boolean(userId),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useCreateSellPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateSellPostRequest) => createSellPost(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};

export const useUpdateSellPostMutation = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateSellPostRequest) => updateSellPost(postId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};

export const useDeleteSellPostMutation = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSellPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};

export const useReserveSellPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SellPostActionRequest) => reserveSellPost(request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: sellKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};

export const useCompleteSellPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SellPostActionRequest) => completeSellPost(request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: sellKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};

export const useActivateSellPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SellPostActionRequest) => activateSellPost(request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: sellKeys.detail(variables.postId) });
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
    },
  });
};
