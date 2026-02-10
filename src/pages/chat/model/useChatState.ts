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
import { useActivePostMutation, useCompletePostMutation, useReservePostMutation } from '@shared/apis/sell';
import { useToast } from '@shared/hooks';
import { useAuthStore } from '@shared/stores';
import { differenceBy } from 'es-toolkit';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useChatState = () => {
  const { userId } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const reserveMutation = useReservePostMutation();
  const completeMutation = useCompletePostMutation();
  const activeMutation = useActivePostMutation();

  const initialRoomId = searchParams.get('roomId');

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(() =>
    initialRoomId ? Number(initialRoomId) : null
  );
  const [localMessages, setLocalMessages] = useState<ChatMessageItem[]>([]);
  const [statusByRoom, setStatusByRoom] = useState<Record<number, PostStatus>>({});
  const [isConnected, setIsConnected] = useState(false);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const { data: rooms = [], refetch: refetchRooms, isLoading: isRoomsLoading } = useChatRoomsQuery();
  const { data: serverMessages = [], isLoading: isMessagesLoading } = useChatMessagesQuery(selectedRoomId);

  // rooms에서 선택된 방 정보 가져오기
  const selectedRoom = rooms.find((r) => r.roomId === selectedRoomId);
  const postId = selectedRoom?.postId ?? null;
  const partnerId = selectedRoom?.partnerId ?? null;
  const { data: currentRoom, isLoading: isRoomLoading } = useChatRoomQuery(postId, partnerId);

  const isLoading = isMessagesLoading || isRoomLoading;

  const messages = [...serverMessages, ...differenceBy(localMessages, serverMessages, (m) => m.messageId)];

  const hasSelection = selectedRoomId !== null;
  const isSeller = selectedRoom?.seller ?? false;
  const activeStatus = selectedRoomId
    ? (statusByRoom[selectedRoomId] ?? currentRoom?.postStatus ?? '판매중')
    : '판매중';

  const handleWebSocketMessage = useCallback(
    (message: WebSocketMessage) => {
      if (isReadNotification(message)) {
        setLocalMessages((prev) => prev.map((m) => (m.roomId === message.roomId ? { ...m, read: true } : m)));
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
        setLocalMessages((prev) => [...prev, newMessage]);
        refetchRooms();
      }
    },
    [refetchRooms]
  );

  // WebSocket 연결 (userId 기반으로만 연결 유지)
  useEffect(() => {
    if (!userId) {
      return;
    }

    chatSocket.connect(
      () => {
        setIsConnected(true);
      },
      () => {
        setIsConnected(false);
      }
    );

    return () => {
      chatSocket.disconnect();
      setIsConnected(false);
    };
  }, [userId]);

  // 방 선택 핸들러 (목록에서 클릭 시, null로 선택 해제)
  const handleSelectRoom = useCallback(
    (roomId: number | null) => {
      if (roomId === selectedRoomId) {
        return;
      }
      setSelectedRoomId(roomId);
      setLocalMessages([]);
    },
    [selectedRoomId]
  );

  // 방 선택 시 구독 및 읽음 처리
  useEffect(() => {
    if (!selectedRoomId || !isConnected) {
      return;
    }

    chatSocket.subscribeRoom(selectedRoomId, handleWebSocketMessage);
    chatSocket.sendRead({ roomId: selectedRoomId });
  }, [selectedRoomId, isConnected, handleWebSocketMessage]);

  const handleSend = useCallback(
    (content: string) => {
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
    },
    [selectedRoomId, rooms]
  );

  const scrollToBottom = useCallback(() => {
    const container = messageListRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback(() => {
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
  }, [selectedRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  const handleStatusChange = useCallback(
    (newStatus: PostStatus) => {
      if (!selectedRoomId || !currentRoom) {
        return;
      }

      const postId = currentRoom.sellPostId;
      const buyerId = currentRoom.buyerId;

      const updateLocalStatus = () => {
        setStatusByRoom((prev) => ({ ...prev, [selectedRoomId]: newStatus }));
      };

      const handleError = () => {
        showToast('상태 변경에 실패했습니다. 다시 시도해 주세요.', 'error');
      };

      if (newStatus === '예약중') {
        reserveMutation.mutate({ postId, buyerId }, { onSuccess: updateLocalStatus, onError: handleError });
      } else if (newStatus === '판매완료') {
        completeMutation.mutate({ postId, buyerId }, { onSuccess: updateLocalStatus, onError: handleError });
      } else if (newStatus === '판매중') {
        activeMutation.mutate({ postId }, { onSuccess: updateLocalStatus, onError: handleError });
      }
    },
    [selectedRoomId, currentRoom, showToast, reserveMutation, completeMutation, activeMutation]
  );

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
