import type { ApiResponse } from '../types';

export interface SendMessageRequest {
  userId: number;
  message: string;
}

export interface SendMessageData {
  reply: string;
}

export type SendMessageResponseBody = ApiResponse<SendMessageData>;

export interface ChatHistoryItem {
  role: string;
  message: string;
}

export type ChatHistoryData = ChatHistoryItem[];

export type ChatHistoryResponseBody = ApiResponse<ChatHistoryData>;
