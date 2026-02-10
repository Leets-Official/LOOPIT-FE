import type { ApiResponse } from '../types';

export type ChatMessageType = 'TEXT' | 'IMAGE';

export type PostStatus = '판매중' | '예약중' | '판매완료';

// REST API Types

export interface ChatRoomData {
  roomId: number;
  sellerId: number;
  buyerId: number;
  sellPostId: number;
  postTitle: string;
  postPrice: number;
  postCreatedAt: string;
  postUpdatedAt: string;
  thumbnail: string;
  postStatus: string;
}

export type CreateRoomResponseBody = ApiResponse<ChatRoomData>;

export interface ChatRoomListItem {
  roomId: number;
  postId: number;
  partnerId: number;
  partnerNickname: string;
  partnerProfileImage: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  thumbnail: string;
  hasUnreadMessages: boolean;
  seller: boolean;
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
  receiverId: number;
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
