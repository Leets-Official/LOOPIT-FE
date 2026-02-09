import type { ApiResponse } from '../types';

export type ChatMessageType = 'TEXT' | 'IMAGE';

export type PostStatus = '판매중' | '예약중' | '판매완료';

// REST API Types

export interface CreateRoomRequest {
  sellerId: number;
  buyerId: number;
  sellPostId: number;
}

export interface ChatRoomData {
  roomId: number;
  sellerId: number;
  buyerId: number;
  sellPostId: number;
  postTitle: string;
  postPrice: number;
  postCreatedAt: string;
  thumbnail: string;
  postStatus: PostStatus;
}

export type CreateRoomResponseBody = ApiResponse<ChatRoomData>;

export interface ChatRoomListItem {
  roomId: number;
  partnerId: number;
  partnerNickname: string;
  partnerProfileImage: string;
  lastMessage: string;
  lastMessageAt: string;
  thumbnail: string;
  hasUnreadMessages: boolean;
}

export type ChatRoomListResponseBody = ApiResponse<ChatRoomListItem[]>;

export interface ChatMessageItem {
  messageId: number;
  roomId: number;
  sellPostId: number;
  senderId: number;
  senderNickname: string;
  content: string;
  type: ChatMessageType;
  sendTime: string;
  read: boolean;
}

export type ChatMessagesResponseBody = ApiResponse<ChatMessageItem[]>;

export type HasUnreadMessagesResponseBody = ApiResponse<boolean>;

// WebSocket/STOMP Types

export interface SendMessagePayload {
  roomId: number;
  content: string;
  type: ChatMessageType;
}

export interface ReadMessagePayload {
  roomId: number;
}

export interface ReceivedMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  senderNickname: string;
  sellPostId: number;
  content: string;
  type: ChatMessageType;
  sendTime: string;
  isRead: boolean;
}

export interface ReadNotification {
  type: 'READ';
  roomId: number;
  readerId: number;
}

export type WebSocketMessage = ReceivedMessage | ReadNotification;

export const isReadNotification = (msg: WebSocketMessage): msg is ReadNotification => {
  return 'type' in msg && msg.type === 'READ';
};
