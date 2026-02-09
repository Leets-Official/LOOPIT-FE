import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkUnreadMessages, createOrGetRoom, getChatMessages, getChatRooms } from './api';
import { chatKeys } from './keys';
import type { CreateRoomRequest } from './types';

export const useChatRoomsQuery = () => {
  return useQuery({
    queryKey: chatKeys.rooms(),
    queryFn: getChatRooms,
  });
};

export const useChatMessagesQuery = (roomId: number | null) => {
  return useQuery({
    queryKey: chatKeys.messages(roomId!),
    queryFn: () => getChatMessages(roomId!),
    enabled: roomId !== null,
  });
};

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateRoomRequest) => createOrGetRoom(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.rooms() });
    },
  });
};

export const useHasUnreadMessagesQuery = () => {
  return useQuery({
    queryKey: chatKeys.unread(),
    queryFn: checkUnreadMessages,
    refetchInterval: 30000,
  });
};
