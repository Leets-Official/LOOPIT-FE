import { axiosInstance } from '../axiosInstance';
import { SELLER_ENDPOINTS } from './endpoints';
import type { SellerListParams, SellerListResponseBody, SellerPostsData } from './types';

export const getSellerPosts = async (params: SellerListParams): Promise<SellerPostsData> => {
  const response = await axiosInstance.get<SellerListResponseBody>(`${SELLER_ENDPOINTS.LIST}/${params.postId}`, {
    params: {
      page: params.page ?? 0,
    },
  });
  return response.data.data;
};
