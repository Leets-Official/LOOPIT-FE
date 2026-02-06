import {
  type ChatMessageItem,
  type ChatRoomData,
  type WebSocketMessage,
  chatSocket,
  isReadNotification,
  useChatMessagesQuery,
  useChatRoomsQuery,
  useCreateRoomMutation,
} from '@shared/apis/chat';
import { useAuthStore } from '@shared/stores';
import { useCallback, useEffect, useRef, useState } from 'react';

type PostStatus = '판매중' | '예약중' | '판매완료';

export const useChatState = () => {
  const { userId } = useAuthStore();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [currentRoom, setCurrentRoom] = useState<ChatRoomData | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessageItem[]>([]);
  const [statusByRoom, setStatusByRoom] = useState<Record<number, PostStatus>>({});
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const { data: rooms = [], refetch: refetchRooms } = useChatRoomsQuery();
  const { data: serverMessages = [] } = useChatMessagesQuery(selectedRoomId);
  const createRoomMutation = useCreateRoomMutation();

  const messages = [
    ...serverMessages,
    ...localMessages.filter((m) => !serverMessages.some((s) => s.messageId === m.messageId)),
  ];

  const hasSelection = selectedRoomId !== null;
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

  // WebSocket 연결
  useEffect(() => {
    if (!userId) {
      return;
    }

    chatSocket.connect(
      () => {
        if (selectedRoomId) {
          chatSocket.subscribeRoom(selectedRoomId, handleWebSocketMessage);
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );

    return () => {
      chatSocket.disconnect();
    };
  }, [userId, selectedRoomId, handleWebSocketMessage]);

  // 방 선택 시 구독 변경
  useEffect(() => {
    if (selectedRoomId && chatSocket.isConnected) {
      setLocalMessages([]);
      chatSocket.subscribeRoom(selectedRoomId, handleWebSocketMessage);
      chatSocket.sendRead({ roomId: selectedRoomId });
    }
  }, [selectedRoomId, handleWebSocketMessage]);

  // 방 선택 시 상세 정보 조회
  useEffect(() => {
    if (!selectedRoomId || !userId) {
      return;
    }

    const room = rooms.find((r) => r.roomId === selectedRoomId);
    if (room) {
      createRoomMutation.mutate(
        { sellerId: room.partnerId, buyerId: userId, sellPostId: 0 },
        {
          onSuccess: (data) => {
            setCurrentRoom(data);
            setStatusByRoom((prev) => ({ ...prev, [selectedRoomId]: data.postStatus }));
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomId, userId, rooms]);

  const handleSend = useCallback(
    (content: string) => {
      if (!selectedRoomId || !content.trim()) {
        return;
      }

      chatSocket.sendMessage({
        roomId: selectedRoomId,
        content: content.trim(),
        type: 'TEXT',
      });
    },
    [selectedRoomId]
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

  return {
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    currentRoom,
    messages,
    currentUserId: userId ?? 0,
    hasSelection,
    messageListRef,
    activeStatus,
    setStatusByRoom,
    handleSend,
    handleScroll,
  };
};
