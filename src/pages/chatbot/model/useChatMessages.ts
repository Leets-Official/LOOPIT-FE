import { useChatHistoryQuery, useSendMessageMutation } from '@shared/apis/chatbot';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { ERROR_MESSAGES, INITIAL_BOT_MESSAGE } from './constants';
import type { ChatMessage } from './types';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 429) {
      const timeMatch = serverMessage?.match(/(\d+시간)/);
      const timeInfo = timeMatch ? ` ${timeMatch[1]} 후에 다시 시도해주세요.` : '';
      return `${ERROR_MESSAGES.RATE_LIMIT}${timeInfo}`;
    }
    if (status === 502) {
      return ERROR_MESSAGES.API_CONNECTION;
    }

    if (serverMessage) {
      return serverMessage;
    }
  }

  return ERROR_MESSAGES.DEFAULT;
};

export const useChatMessages = () => {
  const { data: history, isLoading: isHistoryLoading } = useChatHistoryQuery();
  const sendMutation = useSendMessageMutation();
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  const messages: ChatMessage[] = (() => {
    const initialMessage: ChatMessage = {
      id: 'bot-initial',
      role: 'bot' as const,
      content: INITIAL_BOT_MESSAGE,
      status: 'done',
    };

    if (!history || history.length === 0) {
      return [initialMessage];
    }

    const historyMessages = history.map((item, index) => {
      const id = `history-${index}`;
      const isTyping = id === typingMessageId;
      return {
        id,
        role: item.role === 'User' ? ('user' as const) : ('bot' as const),
        content: item.message,
        status: isTyping ? ('typing' as const) : ('done' as const),
      };
    });

    return [initialMessage, ...historyMessages];
  })();

  const displayMessages: ChatMessage[] = (() => {
    if (!sendMutation.isPending) {
      return messages;
    }

    const pendingUserMessage: ChatMessage = {
      id: 'pending-user',
      role: 'user',
      content: sendMutation.variables ?? '',
      status: 'done',
    };

    const loadingBotMessage: ChatMessage = {
      id: 'pending-bot',
      role: 'bot',
      content: '',
      status: 'loading',
    };

    return [...messages, pendingUserMessage, loadingBotMessage];
  })();

  const handleSend = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || sendMutation.isPending) {
      return;
    }

    sendMutation.mutate(trimmed, {
      onSuccess: () => {
        const newMessageId = `history-${(history?.length ?? 0) + 1}`;
        setTypingMessageId(newMessageId);
      },
    });
  };

  const handleTypingComplete = useCallback(() => {
    setTypingMessageId(null);
  }, []);

  const errorMessage = sendMutation.isError ? getErrorMessage(sendMutation.error) : null;

  return {
    displayMessages,
    isHistoryLoading,
    errorMessage,
    handleSend,
    handleTypingComplete,
  };
};
