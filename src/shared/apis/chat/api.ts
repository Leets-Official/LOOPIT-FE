import { axiosInstance } from '../axiosInstance';
import { CHAT_ENDPOINTS } from './endpoints';
import type {
  ChatMessageItem,
  ChatMessagesResponseBody,
  ChatRoomData,
  ChatRoomListItem,
  ChatRoomListResponseBody,
  CreateRoomResponseBody,
  HasUnreadMessagesResponseBody,
} from './types';

export const createOrGetRoom = async (postId: number): Promise<ChatRoomData> => {
  const response = await axiosInstance.post<CreateRoomResponseBody>(CHAT_ENDPOINTS.ROOM(postId));
  return response.data.data;
};

export const getRoomByPostId = async (postId: number, partnerId: number): Promise<ChatRoomData> => {
  const response = await axiosInstance.get<CreateRoomResponseBody>(CHAT_ENDPOINTS.ROOM(postId), {
    params: { partnerId },
  });
  return response.data.data;
};

export const getChatRooms = async (): Promise<ChatRoomListItem[]> => {
  const response = await axiosInstance.get<ChatRoomListResponseBody>(CHAT_ENDPOINTS.ROOMS);
  return response.data.data;
};

export const getChatMessages = async (roomId: number): Promise<ChatMessageItem[]> => {
  const response = await axiosInstance.get<ChatMessagesResponseBody>(CHAT_ENDPOINTS.MESSAGES(roomId));
  return response.data.data;
};

export const checkUnreadMessages = async (): Promise<boolean> => {
  const response = await axiosInstance.get<HasUnreadMessagesResponseBody>(CHAT_ENDPOINTS.CHECK);
  return response.data.data;
};
