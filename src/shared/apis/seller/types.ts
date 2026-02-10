import type { ApiResponse } from '../types';

export interface SellerPostApiItem {
  postId: number;
  title: string;
  img: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerListPage<T> {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
  content: T[];
}

export interface SellerPostsData {
  sellerNickName: string;
  profileImg: string;
  sellPosts: SellerListPage<SellerPostApiItem>;
}

export interface SellerListParams {
  postId: number | string;
  page?: number;
}

export type SellerListResponseBody = ApiResponse<SellerPostsData>;
