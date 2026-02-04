import { axiosInstance } from '../axiosInstance';
import { AUTH_ENDPOINTS } from './endpoints';
import type {
  KakaoLoginRequest,
  KakaoLoginResponse,
  KakaoLoginResponseBody,
  KakaoRegisterRequest,
  KakaoRegisterResponse,
  KakaoRegisterResponseBody,
} from './types';

export const getKakaoLogin = async (request: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  const response = await axiosInstance.get<KakaoLoginResponseBody>(AUTH_ENDPOINTS.KAKAO_LOGIN, {
    params: { code: request.code },
  });
  const authHeader = response.headers['authorization'] as string | undefined;
  const accessToken = authHeader?.replace('Bearer ', '') ?? null;

  return {
    accessToken,
    registered: response.data.data.registered,
    kakaoId: response.data.data.kakaoId,
    userId: response.data.data.userId,
  };
};

export const postKakaoRegister = async (request: KakaoRegisterRequest): Promise<KakaoRegisterResponse> => {
  const response = await axiosInstance.post<KakaoRegisterResponseBody>(AUTH_ENDPOINTS.KAKAO_REGISTER, request);

  const authHeader = response.headers['authorization'] as string | undefined;
  const accessToken = authHeader?.replace('Bearer ', '') ?? null;

  return {
    ...response.data.data,
    accessToken,
  };
};

export const postLogout = async (): Promise<void> => {
  await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
};
