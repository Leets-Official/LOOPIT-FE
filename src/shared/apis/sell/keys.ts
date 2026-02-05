export const sellKeys = {
  all: ['sell'] as const,
  lists: () => [...sellKeys.all, 'list'] as const,
  list: () => [...sellKeys.lists()] as const,
  details: () => [...sellKeys.all, 'detail'] as const,
  detail: (postId: number | string) => [...sellKeys.details(), postId] as const,
  byUser: (userId: number | string) => [...sellKeys.lists(), 'user', userId] as const,
};
