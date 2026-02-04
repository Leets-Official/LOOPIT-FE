import { CHAT_THREADS, INITIAL_STATUS_BY_THREAD, THREAD_CONTENT } from '@shared/mocks/data/chat';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ThreadContent } from '@shared/types/chat';

type StatusOption = (typeof INITIAL_STATUS_BY_THREAD)[string];

const formatMetaLabel = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? '오후' : '오전';
  const hourLabel = `${hours % 12 === 0 ? 12 : hours % 12}`.padStart(2, '0');
  const minuteLabel = `${minutes}`.padStart(2, '0');
  return `읽음 · ${meridiem} ${hourLabel}:${minuteLabel}`;
};

export const useChatState = () => {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [unreadByThread, setUnreadByThread] = useState<Record<string, boolean>>(() =>
    CHAT_THREADS.reduce<Record<string, boolean>>((acc, thread) => {
      if (thread.hasAlert) {
        acc[thread.id] = true;
      }
      return acc;
    }, {})
  );
  const [threadContent, setThreadContent] = useState<Record<string, ThreadContent>>(THREAD_CONTENT);
  const [statusByThread, setStatusByThread] = useState<Record<string, StatusOption>>(INITIAL_STATUS_BY_THREAD);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const hasSelection = selectedThreadId !== null;
  const activeThread = useMemo(
    () => (selectedThreadId ? threadContent[selectedThreadId] : null),
    [selectedThreadId, threadContent]
  );

  const markThreadReadIfNeeded = (threadId: string | null) => {
    if (!threadId) {
      return;
    }
    if (!unreadByThread[threadId]) {
      return;
    }
    setUnreadByThread((prev) => ({ ...prev, [threadId]: false }));
  };

  const handleSend = (nextMessage: string) => {
    if (!selectedThreadId || !nextMessage.trim()) {
      setMessage('');
      return;
    }

    const now = new Date();
    const metaLabel = formatMetaLabel(now);

    setThreadContent((prev) => {
      const current = prev[selectedThreadId];
      if (!current) {
        return prev;
      }
      return {
        ...prev,
        [selectedThreadId]: {
          ...current,
          timeline: [
            ...current.timeline,
            {
              type: 'message',
              id: `local-${Date.now()}`,
              role: 'sender',
              message: nextMessage.trim(),
              meta: metaLabel,
              metaDateTime: now.toISOString(),
            },
          ],
        },
      };
    });
    setMessage('');
  };

  const scrollToBottom = () => {
    const container = messageListRef.current;
    if (!container) {
      return;
    }
    container.scrollTop = container.scrollHeight;
  };

  const handleScroll = useCallback(() => {
    if (!selectedThreadId) {
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
      markThreadReadIfNeeded(selectedThreadId);
    }
  }, [selectedThreadId, unreadByThread]);

  useEffect(() => {
    if (!selectedThreadId) {
      return;
    }
    const handle = window.requestAnimationFrame(() => {
      scrollToBottom();
      handleScroll();
    });
    return () => window.cancelAnimationFrame(handle);
  }, [selectedThreadId, activeThread?.timeline.length, handleScroll]);

  return {
    activeThread,
    hasSelection,
    message,
    messageListRef,
    selectedThreadId,
    setMessage,
    setSelectedThreadId,
    unreadByThread,
    statusByThread,
    setStatusByThread,
    handleSend,
    handleScroll,
  };
};
