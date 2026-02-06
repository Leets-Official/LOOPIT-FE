import { ChatConversation } from './ChatConversation';
import { ChatThreadList } from './ChatThreadList';
import { useChatState } from '../model/useChatState';

const ChatPage = () => {
  const {
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    currentRoom,
    messages,
    currentUserId,
    hasSelection,
    messageListRef,
    activeStatus,
    setStatusByRoom,
    handleSend,
    handleScroll,
  } = useChatState();

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col bg-white xl:min-h-[1024px]">
        <main className="md:px-xxxl flex flex-1 flex-col px-(--margin-l) pb-[80px] xl:px-0">
          <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-8 lg:flex-row lg:gap-0">
            <ChatThreadList rooms={rooms} selectedRoomId={selectedRoomId} onSelect={setSelectedRoomId} />
            <ChatConversation
              room={currentRoom}
              messages={messages}
              currentUserId={currentUserId}
              hasSelection={hasSelection}
              messageListRef={messageListRef}
              onSend={handleSend}
              onScroll={handleScroll}
              activeStatus={activeStatus}
              onStatusChange={(value) => {
                if (!selectedRoomId) {
                  return;
                }
                setStatusByRoom((prev) => ({ ...prev, [selectedRoomId]: value }));
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
