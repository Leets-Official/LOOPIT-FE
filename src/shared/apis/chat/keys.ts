export const chatKeys = {
  all: ['chat'] as const,
  rooms: () => [...chatKeys.all, 'rooms'] as const,
  room: (roomId: number) => [...chatKeys.all, 'room', roomId] as const,
  messages: (roomId: number) => [...chatKeys.room(roomId), 'messages'] as const,
  unread: () => [...chatKeys.all, 'unread'] as const,
};
