import { axiosInstance } from '../axiosInstance';
import { SELL_ENDPOINTS } from './endpoints';
import type {
  CreateSellPostRequest,
  CreateSellPostResponse,
  CreateSellPostResponseBody,
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
): Promise<{ postId: number }> => {
  const response = await axiosInstance.put<UpdateSellPostResponseBody>(SELL_ENDPOINTS.ITEM(postId), request);
  return response.data.data;
};

export const deleteSellPost = async (postId: number | string): Promise<void> => {
  await axiosInstance.delete(SELL_ENDPOINTS.ITEM(postId));
};
