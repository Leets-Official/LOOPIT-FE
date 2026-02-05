import { CHAT_THREADS, STATUS_OPTIONS } from '@shared/mocks/data/chat';
import { ChatConversation } from './ChatConversation';
import { ChatThreadList } from './ChatThreadList';
import { useChatState } from '../model/useChatState';

const ChatPage = () => {
  const {
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
  } = useChatState();

  const activeStatus =
    selectedThreadId && statusByThread[selectedThreadId]
      ? statusByThread[selectedThreadId]
      : (STATUS_OPTIONS[0] as (typeof STATUS_OPTIONS)[number]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="md:px-xxxl flex flex-1 flex-col px-(--margin-l) pb-[80px] xl:px-0">
          <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-8 lg:flex-row lg:gap-0">
            <ChatThreadList
              threads={CHAT_THREADS}
              selectedThreadId={selectedThreadId}
              unreadByThread={unreadByThread}
              onSelect={setSelectedThreadId}
            />
            <ChatConversation
              activeThread={activeThread}
              hasSelection={hasSelection}
              message={message}
              messageListRef={messageListRef}
              onSend={handleSend}
              onMessageChange={setMessage}
              onScroll={handleScroll}
              activeStatus={activeStatus}
              onStatusChange={(value) => {
                if (!selectedThreadId) {
                  return;
                }
                setStatusByThread((prev) => ({ ...prev, [selectedThreadId]: value }));
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
