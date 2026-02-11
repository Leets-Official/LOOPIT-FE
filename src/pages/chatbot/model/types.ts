export type ChatMessageStatus = 'loading' | 'typing' | 'done';

export type ChatMessageRole = 'bot' | 'user';

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  displayContent?: string;
  status?: ChatMessageStatus;
};
