import { axiosInstance } from '../axiosInstance';
import { BUY_ENDPOINTS } from './endpoints';
import { mapBuyPostToItem } from './mapper';
import type {
  BuyAutocompleteResponseBody,
  BuyDetailResponseBody,
  BuyListPage,
  BuyListParams,
  BuyListResponseBody,
  TogglePostWishlistRequest,
  TogglePostWishlistResponseBody,
  TogglePostWishlistResult,
} from './types';
import type { BuyItem } from '@shared/types/buy';

export const getBuyItems = async (): Promise<BuyItem[]> => {
  const response = await axiosInstance.get<BuyListResponseBody>(BUY_ENDPOINTS.LIST);
  return response.data.data.content.map(mapBuyPostToItem);
};

export const getBuyItemsByCondition = async (params?: BuyListParams): Promise<BuyListPage<BuyItem>> => {
  const response = await axiosInstance.get<BuyListResponseBody>(BUY_ENDPOINTS.LIST, {
    params: {
      page: params?.page ?? 0,
      manufacturer: params?.manufacturer,
      series: params?.series,
      priceRange: params?.priceRange,
      keyword: params?.keyword,
    },
    paramsSerializer: {
      serialize: (payload) => {
        const searchParams = new URLSearchParams();

        const appendValue = (key: string, value: unknown) => {
          if (value === undefined || value === null || value === '') {
            return;
          }
          if (Array.isArray(value)) {
            value.forEach((entry) => {
              if (entry !== undefined && entry !== null && entry !== '') {
                searchParams.append(key, String(entry));
              }
            });
            return;
          }
          searchParams.append(key, String(value));
        };

        Object.entries(payload).forEach(([key, value]) => {
          appendValue(key, value);
        });

        return searchParams.toString();
      },
    },
  });
  return {
    ...response.data.data,
    content: response.data.data.content.map(mapBuyPostToItem),
  };
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

export const togglePostWishlist = async (request: TogglePostWishlistRequest): Promise<TogglePostWishlistResult> => {
  const response = await axiosInstance.post<TogglePostWishlistResponseBody>(BUY_ENDPOINTS.WISHLIST_TOGGLE, request);
  return response.data.data;
};
