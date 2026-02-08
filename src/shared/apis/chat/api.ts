import { axiosInstance } from '../axiosInstance';
import { CHAT_ENDPOINTS } from './endpoints';
import type {
  ChatMessageItem,
  ChatMessagesResponseBody,
  ChatRoomData,
  ChatRoomListItem,
  ChatRoomListResponseBody,
  CreateRoomRequest,
  CreateRoomResponseBody,
} from './types';

export const createOrGetRoom = async (request: CreateRoomRequest): Promise<ChatRoomData> => {
  const response = await axiosInstance.post<CreateRoomResponseBody>(CHAT_ENDPOINTS.ROOM, request);
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
