export const sellKeys = {
  all: ['sell'] as const,
  lists: () => [...sellKeys.all, 'list'] as const,
  autocomplete: (keyword: string) => [...sellKeys.all, 'autocomplete', keyword] as const,
};
