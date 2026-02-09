export const CHAT_ENDPOINTS = {
  ROOM: (postId: number) => `/chat/room/${postId}`,
  ROOMS: '/chat/rooms',
  MESSAGES: (roomId: number) => `/chat/room/${roomId}/messages`,
  CHECK: '/chat/check',
} as const;

export const STOMP_ENDPOINTS = {
  CONNECT: '/ws-chat/websocket',
  PUBLISH: {
    MESSAGE: '/pub/chat/message',
    READ: '/pub/chat/read',
  },
  SUBSCRIBE: {
    ROOM: (roomId: number) => `/sub/chat/room/${roomId}`,
  },
} as const;
