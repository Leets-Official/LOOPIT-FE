import { axiosInstance } from '../axiosInstance';
import { USER_ENDPOINTS } from './endpoints';
import type { UpdateUserRequest, UserData, UserResponseBody } from './types';

export const getUser = async (): Promise<UserData> => {
  const response = await axiosInstance.get<UserResponseBody>(USER_ENDPOINTS.USER);
  return response.data.data;
};

export const updateUser = async (userId: number, data: UpdateUserRequest): Promise<UserData> => {
  const response = await axiosInstance.put<UserResponseBody>(USER_ENDPOINTS.UPDATE(userId), data);
  return response.data.data;
};

export const updateUserImage = async (userId: number, imgUrl: string): Promise<UserData> => {
  const response = await axiosInstance.put<UserResponseBody>(USER_ENDPOINTS.UPDATE_IMAGE(userId), { imgUrl });
  return response.data.data;
};
