import { axiosInstance } from '../axiosInstance';
import { BUY_ENDPOINTS } from './endpoints';
import { mapBuyPostToItem } from './mapper';
import type { BuyAutocompleteResponseBody, BuyDetailResponseBody, BuyListParams, BuyListResponseBody } from './types';
import type { BuyItem } from '@shared/types/buy';

export const getBuyItems = async (): Promise<BuyItem[]> => {
  const response = await axiosInstance.get<BuyListResponseBody>(BUY_ENDPOINTS.LIST);
  return response.data.data.content.map(mapBuyPostToItem);
};

export const getBuyItemsByCondition = async (params?: BuyListParams): Promise<BuyItem[]> => {
  const response = await axiosInstance.get<BuyListResponseBody>(BUY_ENDPOINTS.LIST, {
    params: {
      page: params?.page ?? 0,
      manufacturer: params?.manufacturer,
      series: params?.series,
      priceRange: params?.priceRange,
      keyword: params?.keyword,
    },
  });
  return response.data.data.content.map(mapBuyPostToItem);
};

export const getBuyItemById = async (id: string | number): Promise<BuyItem> => {
  const response = await axiosInstance.get<BuyDetailResponseBody>(`${BUY_ENDPOINTS.DETAIL}/${id}`);
  return mapBuyPostToItem(response.data.data);
};

export const getBuyAutocomplete = async (keyword: string): Promise<string[]> => {
  const response = await axiosInstance.get<BuyAutocompleteResponseBody>(BUY_ENDPOINTS.AUTOCOMPLETE, {
    params: { keyword },
  });
  return response.data.data;
};
