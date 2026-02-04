import type { ApiResponse, UserProfile } from '../types';

// 로그인

// Request
export interface KakaoLoginRequest {
  code: string;
}

// Response Data
export interface KakaoLoginData {
  registered: boolean;
  kakaoId: string;
  userId: number;
}

// Response Body
export type KakaoLoginResponseBody = ApiResponse<KakaoLoginData>;

// Response
export interface KakaoLoginResponse {
  accessToken: string | null;
  registered: boolean;
  kakaoId: string;
  userId: number;
}

// 회원가입

// Request
export interface KakaoRegisterRequest {
  kakaoId: string;
  nickname: string;
  name: string;
  email: string;
  birthdate: string;
  profileImage: string;
}

// Response Data
export interface KakaoRegisterData extends UserProfile {
  userId: number;
}

// Response Body
export type KakaoRegisterResponseBody = ApiResponse<KakaoRegisterData>;

// Response
export interface KakaoRegisterResponse extends KakaoRegisterData {
  accessToken: string | null;
}
