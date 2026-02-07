import { useQuery } from '@tanstack/react-query';
import { getBuyAutocomplete, getBuyItemById, getBuyItemsByCondition } from './api';
import { buyKeys } from './keys';
import type { BuyListParams } from './types';

export const useBuyItemsQuery = (params?: BuyListParams) => {
  return useQuery({
    queryKey: buyKeys.list(params),
    queryFn: () => getBuyItemsByCondition(params),
    staleTime: 0,
  });
};

export const useBuyItemQuery = (id?: string | number) => {
  return useQuery({
    queryKey: buyKeys.detail(id),
    queryFn: () => getBuyItemById(id!),
    enabled: Boolean(id),
  });
};

export const useBuyAutocompleteQuery = (keyword: string) => {
  return useQuery({
    queryKey: buyKeys.autocomplete(keyword),
    queryFn: () => getBuyAutocomplete(keyword),
    enabled: keyword.trim().length > 0,
  });
};
