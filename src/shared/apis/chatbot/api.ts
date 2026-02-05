import { axiosInstance } from '../axiosInstance';
import { CHATBOT_ENDPOINTS } from './endpoints';
import type {
  SendMessageRequest,
  SendMessageData,
  SendMessageResponseBody,
  ChatHistoryData,
  ChatHistoryResponseBody,
} from './types';

export const postSendMessage = async (request: SendMessageRequest): Promise<SendMessageData> => {
  const response = await axiosInstance.post<SendMessageResponseBody>(CHATBOT_ENDPOINTS.SEND, request);
  return response.data.data;
};

export const getChatHistory = async (userId: number): Promise<ChatHistoryData> => {
  const response = await axiosInstance.get<ChatHistoryResponseBody>(CHATBOT_ENDPOINTS.HISTORY, {
    params: { userId },
  });
  return response.data.data;
};
