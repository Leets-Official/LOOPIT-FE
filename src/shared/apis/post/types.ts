import type { ApiResponse } from '../types';

// 공통 페이지네이션
export interface PostListPage<T> {
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

// 가격 필터
export type PriceRangeEnum = 'UNDER_10' | 'FROM_10_TO_30' | 'FROM_30_TO_60' | 'FROM_60_TO_90' | 'OVER_100';

// 게시글 조회 타입
export interface PostApiSeller {
  nickname?: string;
  profileImage?: string;
}

export interface PostApiSpecs {
  manufacturer?: string;
  model?: string;
  color?: string;
  storage?: string;
  battery?: string;
}

export interface SimilarPost {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostApiItem {
  id?: number | string;
  title?: string;
  price?: number | string;
  manufacturer?: string;
  model?: string;
  color?: string;
  capacity?: string;
  content?: string;
  imageUrls?: string[];
  thumbnail?: string;
  hasScratch?: boolean;
  batteryStatus?: string;
  screenCracked?: boolean;
  used?: boolean;
  status?: string;
  postStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  sellerNickname?: string;
  sellerProfileImage?: string;
  seller?: PostApiSeller;
  brand?: string;
  specs?: PostApiSpecs;
  similarPosts?: SimilarPost[];
  liked?: boolean;
  owner?: boolean;
}

export interface PostListCondition {
  manufacturer?: string;
  series?: string[];
  priceRange?: PriceRangeEnum;
  keyword?: string;
}

export interface PostListParams extends PostListCondition {
  page?: number;
}

// 게시글 생성/수정 타입
export interface CreatePostRequest {
  title: string;
  manufacturer: string;
  model: string;
  color: string;
  capacity: string;
  price: number;
  description: string;
  imageUrls: string[];
  hasScratch: boolean;
  batteryStatus: 'GREAT' | 'GOOD' | 'BAD';
  screenCracked: boolean;
  used: boolean;
}

export interface CreatePostResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdatePostRequest = CreatePostRequest;

// 상태 변경 타입
export type PostStatus = 'RESERVED' | 'SOLD' | 'ACTIVE';

export interface ReservePostRequest {
  buyerId: number;
  postId: number;
}

export interface CompletePostRequest {
  postId: number;
  buyerId: number;
}

export interface ActivePostRequest {
  postId: number;
}

export interface PostStatusResponse {
  postId: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

// 판매자 게시글 타입
export interface SellerPostApiItem {
  postId: number;
  title: string;
  img: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerPostsData {
  sellerNickName: string;
  profileImg: string;
  sellPosts: PostListPage<SellerPostApiItem>;
}

export interface SellerListParams {
  postId: number | string;
  page?: number;
}

// Response Bodies
export type PostListResponseBody = ApiResponse<PostListPage<PostApiItem>>;
export type PostDetailResponseBody = ApiResponse<PostApiItem>;
export type PostAutocompleteResponseBody = ApiResponse<string[]>;
export type CreatePostResponseBody = ApiResponse<CreatePostResponse>;
export type UpdatePostResponseBody = ApiResponse<{ id: number }>;
export type ReservePostResponseBody = ApiResponse<PostStatusResponse>;
export type CompletePostResponseBody = ApiResponse<PostStatusResponse>;
export type ActivePostResponseBody = ApiResponse<PostStatusResponse>;
export type SellerListResponseBody = ApiResponse<SellerPostsData>;
