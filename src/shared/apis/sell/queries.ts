import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSellPost, deleteSellPost, getSellAutocomplete, updateSellPost } from './api';
import { sellKeys } from './keys';
import type { CreateSellPostRequest, UpdateSellPostRequest } from './types';
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

export const useSellAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: sellKeys.autocomplete(keyword),
    queryFn: () => getSellAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
  });
};
