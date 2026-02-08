export const sellKeys = {
  all: ['sell'] as const,
  lists: () => [...sellKeys.all, 'list'] as const,
};
