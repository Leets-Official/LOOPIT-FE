export const chatbotKeys = {
  all: ['chatbot'] as const,
  history: (userId: number) => [...chatbotKeys.all, 'history', userId] as const,
} as const;
