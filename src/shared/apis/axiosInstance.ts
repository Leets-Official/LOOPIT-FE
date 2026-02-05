import { ROUTES } from '@shared/constants';
import { getAccessToken, setAccessToken, useAuthStore } from '@shared/stores';
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { AUTH_ENDPOINTS } from './auth/endpoints';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
});

export { getAccessToken, setAccessToken };

// 인증 제외 경로
const AUTH_EXCLUDED_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/kakao'] as const;

const isAuthExcluded = (url?: string) => {
  if (!url) {
    return false;
  }
  return AUTH_EXCLUDED_PATHS.some((path) => url.startsWith(path));
};

// 토큰 갱신 상태 관리
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  pendingQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    resolve(axiosInstance(config));
  });
  pendingQueue = [];
};

// Request 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response 인터셉터 - 401 시 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalConfig || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // 인증 제외 경로면 그냥 에러 반환
    if (isAuthExcluded(originalConfig.url)) {
      return Promise.reject(error);
    }

    // 이미 재시도했으면 로그아웃
    if (originalConfig._retry) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    // 토큰 갱신 중이면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject, config: originalConfig });
      });
    }

    isRefreshing = true;

    try {
      // refreshToken은 httpOnly 쿠키로 자동 전송됨
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = refreshResponse.headers['authorization']?.replace('Bearer ', '');

      if (!newAccessToken) {
        throw new Error('No access token in refresh response');
      }

      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalConfig);
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
