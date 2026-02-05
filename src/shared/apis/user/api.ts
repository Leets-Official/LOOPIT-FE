import { axiosInstance } from '../axiosInstance';
import { USER_ENDPOINTS } from './endpoints';
import type { UserData, UserResponseBody } from './types';

export const getUser = async (userId: number): Promise<UserData> => {
  const response = await axiosInstance.get<UserResponseBody>(USER_ENDPOINTS.USER, {
    params: { userId },
  });
  return response.data.data;
};
