import {
  type ChatMessageItem,
  type PostStatus,
  type WebSocketMessage,
  chatSocket,
  isReadNotification,
  useChatMessagesQuery,
  useChatRoomQuery,
  useChatRoomsQuery,
} from '@shared/apis/chat';
import { useActivePostMutation, useCompletePostMutation, useReservePostMutation } from '@shared/apis/post';
import { useToast } from '@shared/hooks';
import { useAuthStore } from '@shared/stores';
import { AxiosError } from 'axios';
import { differenceBy } from 'es-toolkit';
import { useEffect, useReducer, useRef } from 'react';
import { useSearchParams } from 'react-router';

type ChatState = {
  selectedRoomId: number | null;
  localMessages: ChatMessageItem[];
  statusByRoom: Record<number, PostStatus>;
  isConnected: boolean;
};

type ChatAction =
  | { type: 'SELECT_ROOM'; roomId: number | null }
  | { type: 'ADD_MESSAGE'; message: ChatMessageItem }
  | { type: 'MARK_MESSAGES_READ'; roomId: number }
  | { type: 'UPDATE_STATUS'; roomId: number; status: PostStatus }
  | { type: 'SET_CONNECTED'; connected: boolean };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SELECT_ROOM':
      if (action.roomId === state.selectedRoomId) {
        return state;
      }
      return {
        ...state,
        selectedRoomId: action.roomId,
        localMessages: [],
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        localMessages: [...state.localMessages, action.message],
      };
    case 'MARK_MESSAGES_READ':
      return {
        ...state,
        localMessages: state.localMessages.map((m) => (m.roomId === action.roomId ? { ...m, read: true } : m)),
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        statusByRoom: { ...state.statusByRoom, [action.roomId]: action.status },
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.connected,
      };
    default:
      return state;
  }
};

export const useChatState = () => {
  const { userId } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const reserveMutation = useReservePostMutation();
  const completeMutation = useCompletePostMutation();
  const activeMutation = useActivePostMutation();

  const initialRoomId = searchParams.get('roomId');

  const [state, dispatch] = useReducer(chatReducer, {
    selectedRoomId: initialRoomId ? Number(initialRoomId) : null,
    localMessages: [],
    statusByRoom: {},
    isConnected: false,
  });

  const { selectedRoomId, localMessages, statusByRoom, isConnected } = state;
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const { data: rooms = [], refetch: refetchRooms, isLoading: isRoomsLoading } = useChatRoomsQuery();
  const {
    data: serverMessages = [],
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useChatMessagesQuery(selectedRoomId);

  // rooms에서 선택된 방 정보 가져오기
  const selectedRoom = rooms.find((r) => r.roomId === selectedRoomId);
  const postId = selectedRoom?.postId ?? null;
  const partnerId = selectedRoom?.partnerId ?? null;
  const { data: currentRoom, isLoading: isRoomLoading, error: roomError } = useChatRoomQuery(postId, partnerId);

  const isLoading = isMessagesLoading || isRoomLoading;

  // 채팅방 조회 에러 처리
  useEffect(() => {
    if (roomError) {
      if (roomError instanceof AxiosError && roomError.response?.data?.message) {
        showToast(roomError.response.data.message, 'error');
      } else {
        showToast('채팅방 정보를 불러오는데 실패했습니다', 'error');
      }
    }
  }, [roomError, showToast]);

  // 메시지 조회 에러 처리
  useEffect(() => {
    if (messagesError) {
      if (messagesError instanceof AxiosError && messagesError.response?.data?.message) {
        showToast(messagesError.response.data.message, 'error');
      } else {
        showToast('메시지를 불러오는데 실패했습니다', 'error');
      }
    }
  }, [messagesError, showToast]);

  const messages = [...serverMessages, ...differenceBy(localMessages, serverMessages, (m) => m.messageId)];

  const hasSelection = selectedRoomId !== null;
  const isSeller = selectedRoom?.seller ?? false;
  const activeStatus = selectedRoomId
    ? (statusByRoom[selectedRoomId] ?? currentRoom?.postStatus ?? '판매중')
    : '판매중';

  // WebSocket 연결 (userId 기반으로만 연결 유지)
  useEffect(() => {
    if (!userId) {
      return;
    }

    chatSocket.connect(
      () => {
        dispatch({ type: 'SET_CONNECTED', connected: true });
      },
      () => {
        dispatch({ type: 'SET_CONNECTED', connected: false });
      }
    );

    return () => {
      chatSocket.disconnect();
      dispatch({ type: 'SET_CONNECTED', connected: false });
    };
  }, [userId]);

  // 방 선택 핸들러 (목록에서 클릭 시, null로 선택 해제)
  const handleSelectRoom = (roomId: number | null) => {
    dispatch({ type: 'SELECT_ROOM', roomId });
  };

  // 방 선택 시 구독 및 읽음 처리
  useEffect(() => {
    if (!selectedRoomId || !isConnected) {
      return;
    }

    let refetchTimeout: ReturnType<typeof setTimeout> | null = null;

    const debouncedRefetchRooms = () => {
      if (refetchTimeout) {
        clearTimeout(refetchTimeout);
      }
      refetchTimeout = setTimeout(() => {
        refetchRooms();
      }, 300);
    };

    const handleWebSocketMessage = (message: WebSocketMessage) => {
      if (isReadNotification(message)) {
        dispatch({ type: 'MARK_MESSAGES_READ', roomId: message.roomId });
      } else {
        const newMessage: ChatMessageItem = {
          messageId: message.messageId,
          roomId: message.roomId,
          sellPostId: message.sellPostId,
          senderId: message.senderId,
          senderNickname: message.senderNickname,
          content: message.content,
          type: message.type,
          sendTime: message.sendTime,
          read: message.isRead,
        };
        dispatch({ type: 'ADD_MESSAGE', message: newMessage });
        debouncedRefetchRooms();
      }
    };

    chatSocket.subscribeRoom(selectedRoomId, handleWebSocketMessage);
    chatSocket.sendRead({ roomId: selectedRoomId });

    return () => {
      if (refetchTimeout) {
        clearTimeout(refetchTimeout);
      }
      chatSocket.unsubscribeRoom(selectedRoomId);
    };
  }, [selectedRoomId, isConnected, refetchRooms]);

  const handleSend = (content: string) => {
    const selectedRoom = rooms.find((r) => r.roomId === selectedRoomId);
    if (!selectedRoomId || !selectedRoom || !content.trim()) {
      return;
    }

    chatSocket.sendMessage({
      roomId: selectedRoomId,
      receiverId: selectedRoom.partnerId,
      content: content.trim(),
      type: 'TEXT',
    });
  };

  const handleScroll = () => {
    if (!selectedRoomId) {
      return;
    }

    const container = messageListRef.current;
    if (!container) {
      return;
    }

    const isAtBottom =
      container.scrollHeight <= container.clientHeight + 1 ||
      container.scrollTop + container.clientHeight >= container.scrollHeight - 2;

    if (isAtBottom) {
      chatSocket.sendRead({ roomId: selectedRoomId });
    }
  };

  useEffect(() => {
    const container = messageListRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages.length]);

  const handleStatusChange = (newStatus: PostStatus) => {
    if (!selectedRoomId || !currentRoom) {
      return;
    }

    const postId = currentRoom.sellPostId;
    const buyerId = currentRoom.buyerId;
    const roomId = selectedRoomId;

    const updateLocalStatus = () => {
      dispatch({ type: 'UPDATE_STATUS', roomId, status: newStatus });
    };

    const handleError = (error: Error) => {
      if (error instanceof AxiosError && error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('상태 변경에 실패했습니다. 다시 시도해 주세요.', 'error');
      }
    };

    if (newStatus === '예약중') {
      reserveMutation.mutate({ postId, buyerId }, { onSuccess: updateLocalStatus, onError: handleError });
    } else if (newStatus === '판매완료') {
      completeMutation.mutate({ postId, buyerId }, { onSuccess: updateLocalStatus, onError: handleError });
    } else if (newStatus === '판매중') {
      activeMutation.mutate({ postId }, { onSuccess: updateLocalStatus, onError: handleError });
    }
  };

  return {
    rooms,
    isRoomsLoading,
    selectedRoomId,
    setSelectedRoomId: handleSelectRoom,
    currentRoom,
    messages,
    currentUserId: userId ?? 0,
    hasSelection,
    isSeller,
    isLoading,
    messageListRef,
    activeStatus,
    handleStatusChange,
    handleSend,
    handleScroll,
  };
};
