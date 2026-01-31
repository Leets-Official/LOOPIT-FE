export type ChatMessageStatus = 'loading' | 'done';

export type ChatMessageRole = 'bot' | 'user';

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  status?: ChatMessageStatus;
};
