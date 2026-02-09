import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkUnreadMessages, createOrGetRoom, getChatMessages, getChatRooms } from './api';
import { chatKeys } from './keys';

export const useChatRoomsQuery = () => {
  return useQuery({
    queryKey: chatKeys.rooms(),
    queryFn: getChatRooms,
    staleTime: 10 * 1000,
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
    mutationFn: (postId: number) => createOrGetRoom(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.rooms() });
    },
  });
};

export const useHasUnreadMessagesQuery = () => {
  const { accessToken, _hasHydrated } = useAuthStore();
  const isLoggedIn = _hasHydrated && Boolean(accessToken);

  return useQuery({
    queryKey: chatKeys.unread(),
    queryFn: checkUnreadMessages,
    enabled: isLoggedIn,
    staleTime: 30 * 1000,
    refetchInterval: isLoggedIn ? 30000 : false,
  });
};
