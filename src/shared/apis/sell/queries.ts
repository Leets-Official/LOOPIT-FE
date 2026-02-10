import { buyKeys } from '@shared/apis/buy/keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  activePost,
  completePost,
  createSellPost,
  deleteSellPost,
  getSellAutocomplete,
  reservePost,
  updateSellPost,
} from './api';
import { sellKeys } from './keys';
import type {
  ActivePostRequest,
  CompletePostRequest,
  CreateSellPostRequest,
  ReservePostRequest,
  UpdateSellPostRequest,
} from './types';

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
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
      queryClient.invalidateQueries({ queryKey: buyKeys.detail(postId) });
    },
  });
};

export const useDeleteSellPostMutation = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSellPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellKeys.lists() });
      queryClient.invalidateQueries({ queryKey: buyKeys.lists() });
    },
  });
};

export const useSellAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: sellKeys.autocomplete(keyword),
    queryFn: () => getSellAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useReservePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ReservePostRequest) => reservePost(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: buyKeys.detail(variables.postId) });
    },
  });
};

export const useCompletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CompletePostRequest) => completePost(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: buyKeys.detail(variables.postId) });
    },
  });
};

export const useActivePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ActivePostRequest) => activePost(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: buyKeys.detail(variables.postId) });
    },
  });
};
