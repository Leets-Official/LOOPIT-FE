import { axiosInstance } from '../axiosInstance';
import { SELL_ENDPOINTS } from './endpoints';
import type {
  CreateSellPostRequest,
  CreateSellPostResponse,
  CreateSellPostResponseBody,
  SellPostActionRequest,
  SellPostActionResponseBody,
  SellPostDetailData,
  SellPostDetailResponseBody,
  SellPostListData,
  SellPostListResponseBody,
  UpdateSellPostRequest,
  UpdateSellPostResponseBody,
} from './types';

export const getSellPosts = async (): Promise<SellPostListData> => {
  const response = await axiosInstance.get<SellPostListResponseBody>(SELL_ENDPOINTS.LIST);
  return response.data.data;
};

export const getSellPostDetail = async (postId: number | string): Promise<SellPostDetailData> => {
  const response = await axiosInstance.get<SellPostDetailResponseBody>(SELL_ENDPOINTS.DETAIL(postId));
  return response.data.data;
};

export const getSellPostsByUser = async (userId: number | string): Promise<SellPostListData> => {
  const response = await axiosInstance.get<SellPostListResponseBody>(SELL_ENDPOINTS.BY_USER(userId));
  return response.data.data;
};

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

export const reserveSellPost = async (request: SellPostActionRequest): Promise<void> => {
  await axiosInstance.post<SellPostActionResponseBody>(SELL_ENDPOINTS.RESERVE, request);
};

export const completeSellPost = async (request: SellPostActionRequest): Promise<void> => {
  await axiosInstance.post<SellPostActionResponseBody>(SELL_ENDPOINTS.COMPLETE, request);
};

export const activateSellPost = async (request: SellPostActionRequest): Promise<void> => {
  await axiosInstance.post<SellPostActionResponseBody>(SELL_ENDPOINTS.ACTIVE, request);
};
