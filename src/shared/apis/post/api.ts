import { axiosInstance } from '../axiosInstance';
import { POST_ENDPOINTS } from './endpoints';
import { mapPostApiToItem } from './mapper';
import type {
  ActivePostRequest,
  ActivePostResponseBody,
  CompletePostRequest,
  CompletePostResponseBody,
  CreatePostRequest,
  CreatePostResponse,
  CreatePostResponseBody,
  PostApiItem,
  PostAutocompleteResponseBody,
  PostDetailResponseBody,
  PostListPage,
  PostListParams,
  PostListResponseBody,
  PostStatusResponse,
  ReservePostRequest,
  ReservePostResponseBody,
  SellerListParams,
  SellerListResponseBody,
  SellerPostsData,
  UpdatePostRequest,
  UpdatePostResponseBody,
} from './types';
import type { ApiResponse } from '../types';
import type { BuyItem } from '@shared/types/post';

// SSR용 서버 fetch 함수 (loader에서 사용)
const getServerApiBaseUrl = () => process.env.VITE_API_BASE_URL ?? '';

export const getPostByIdServer = async (id: string | number): Promise<BuyItem> => {
  const response = await fetch(`${getServerApiBaseUrl()}${POST_ENDPOINTS.DETAIL}/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<PostApiItem>;
  return mapPostApiToItem(json.data);
};

// 게시글 조회
export const getPostList = async (): Promise<BuyItem[]> => {
  const response = await axiosInstance.get<PostListResponseBody>(POST_ENDPOINTS.LIST);
  return response.data.data.content.map(mapPostApiToItem);
};

export const getPostListByCondition = async (params?: PostListParams): Promise<PostListPage<BuyItem>> => {
  const response = await axiosInstance.get<PostListResponseBody>(POST_ENDPOINTS.LIST, {
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
    content: response.data.data.content.map(mapPostApiToItem),
  };
};

export const getPostById = async (id: string | number): Promise<BuyItem> => {
  const response = await axiosInstance.get<PostDetailResponseBody>(`${POST_ENDPOINTS.DETAIL}/${id}`);
  return mapPostApiToItem(response.data.data);
};

// 게시글 생성/수정/삭제
export const createPost = async (request: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await axiosInstance.post<CreatePostResponseBody>(POST_ENDPOINTS.LIST, request);
  return response.data.data;
};

export const updatePost = async (postId: number | string, request: UpdatePostRequest): Promise<{ id: number }> => {
  const response = await axiosInstance.put<UpdatePostResponseBody>(POST_ENDPOINTS.ITEM(postId), request);
  return response.data.data;
};

export const deletePost = async (postId: number | string): Promise<void> => {
  await axiosInstance.delete(POST_ENDPOINTS.ITEM(postId));
};

// 상태 변경
export const reservePost = async (request: ReservePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<ReservePostResponseBody>(POST_ENDPOINTS.RESERVE, request);
  return response.data.data;
};

export const completePost = async (request: CompletePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<CompletePostResponseBody>(POST_ENDPOINTS.COMPLETE, request);
  return response.data.data;
};

export const activePost = async (request: ActivePostRequest): Promise<PostStatusResponse> => {
  const response = await axiosInstance.post<ActivePostResponseBody>(POST_ENDPOINTS.ACTIVE, request);
  return response.data.data;
};

// 판매자 게시글
export const getSellerPosts = async (params: SellerListParams): Promise<SellerPostsData> => {
  const response = await axiosInstance.get<SellerListResponseBody>(`${POST_ENDPOINTS.SELLER}/${params.postId}`, {
    params: {
      page: params.page ?? 0,
    },
  });
  return response.data.data;
};

// 검색 자동완성
export const getBuyAutocomplete = async (keyword: string): Promise<string[]> => {
  const response = await axiosInstance.get<PostAutocompleteResponseBody>(POST_ENDPOINTS.AUTOCOMPLETE_BUY, {
    params: { keyword },
  });
  return response.data.data;
};

export const getSellAutocomplete = async (keyword: string): Promise<string[]> => {
  const response = await axiosInstance.get<PostAutocompleteResponseBody>(POST_ENDPOINTS.AUTOCOMPLETE_SELL, {
    params: { keyword },
  });
  return response.data.data;
};
