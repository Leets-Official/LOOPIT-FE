import { useAuthStore } from '@shared/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChatHistory, postSendMessage } from './api';
import { chatbotKeys } from './keys';

export const useChatHistoryQuery = () => {
  const { userId, accessToken, _hasHydrated } = useAuthStore();

  return useQuery({
    queryKey: chatbotKeys.history(userId!),
    queryFn: () => getChatHistory(userId!),
    enabled: _hasHydrated && Boolean(userId) && Boolean(accessToken),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();

  return useMutation({
    mutationFn: (message: string) => postSendMessage({ userId: userId!, message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.history(userId!) });
    },
  });
};
