import { axiosInstance } from '../axiosInstance';
import { SELL_ENDPOINTS } from './endpoints';
import type {
  ActivePostRequest,
  ActivePostResponseBody,
  CompletePostRequest,
  CompletePostResponseBody,
  CreateSellPostRequest,
  CreateSellPostResponse,
  CreateSellPostResponseBody,
  PostStatusResponse,
  ReservePostRequest,
  ReservePostResponseBody,
  SellAutocompleteResponseBody,
  UpdateSellPostRequest,
  UpdateSellPostResponseBody,
} from './types';

export const createSellPost = async (request: CreateSellPostRequest): Promise<CreateSellPostResponse> => {
  const response = await axiosInstance.post<CreateSellPostResponseBody>(SELL_ENDPOINTS.LIST, request);
  return response.data.data;
};

export const updateSellPost = async (
  postId: number | string,
  request: UpdateSellPostRequest
): Promise<{ id: number }> => {
  const response = await axiosInstance.put<UpdateSellPostResponseBody>(SELL_ENDPOINTS.ITEM(postId), request);
  return response.data.data;
};

export const deleteSellPost = async (postId: number | string): Promise<void> => {
  await axiosInstance.delete(SELL_ENDPOINTS.ITEM(postId));
};

export const getSellAutocomplete = async (keyword: string): Promise<string[]> => {
  const response = await axiosInstance.get<SellAutocompleteResponseBody>(SELL_ENDPOINTS.AUTOCOMPLETE, {
    params: { keyword },
  });
  return response.data.data;
};

export const reservePost = async (request: ReservePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<ReservePostResponseBody>(SELL_ENDPOINTS.RESERVE, request);
  return response.data.data;
};

export const completePost = async (request: CompletePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<CompletePostResponseBody>(SELL_ENDPOINTS.COMPLETE, request);
  return response.data.data;
};

export const activePost = async (request: ActivePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<ActivePostResponseBody>(SELL_ENDPOINTS.ACTIVE, request);
  return response.data.data;
};
