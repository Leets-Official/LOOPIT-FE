export const userKeys = {
  all: ['user'] as const,
  detail: (userId: number) => [...userKeys.all, userId] as const,
};
