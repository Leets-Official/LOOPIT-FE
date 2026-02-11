import { ChatConversation } from './ChatConversation';
import { ChatThreadList } from './ChatThreadList';
import { ChatThreadListSkeleton } from './ChatThreadListSkeleton';
import { useChatState } from '../model/useChatState';

const ChatPage = () => {
  const {
    rooms,
    isRoomsLoading,
    selectedRoomId,
    setSelectedRoomId,
    currentRoom,
    messages,
    currentUserId,
    hasSelection,
    isSeller,
    isLoading,
    messageListRef,
    activeStatus,
    handleStatusChange,
    handleSend,
    handleScroll,
  } = useChatState();

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col bg-white">
        <main className="md:px-xxxl flex flex-col px-(--margin-l) xl:flex-1 xl:px-0">
          <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 xl:h-[min(932px,calc(100dvh-120px))] xl:flex-row xl:gap-0">
            <div className={hasSelection ? 'hidden xl:block' : 'block h-fit'}>
              {isRoomsLoading ? (
                <ChatThreadListSkeleton />
              ) : (
                <ChatThreadList rooms={rooms} selectedRoomId={selectedRoomId} onSelect={setSelectedRoomId} />
              )}
            </div>
            <ChatConversation
              room={currentRoom ?? null}
              messages={messages}
              currentUserId={currentUserId}
              hasSelection={hasSelection}
              isSeller={isSeller}
              isLoading={isLoading}
              messageListRef={messageListRef}
              onSend={handleSend}
              onScroll={handleScroll}
              activeStatus={activeStatus}
              onStatusChange={handleStatusChange}
              onBack={() => setSelectedRoomId(null)}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
