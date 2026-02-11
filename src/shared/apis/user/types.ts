import type { ApiResponse, UserProfile } from '../types';

export type UserData = UserProfile;

export type UserResponseBody = ApiResponse<UserProfile>;

export type UpdateUserRequest = {
  nickname: string;
  name: string;
  email: string;
  birthdate: string;
};
