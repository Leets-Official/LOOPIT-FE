export const authKeys = {
  all: ['auth'] as const,
  kakaoLogin: () => [...authKeys.all, 'kakaoLogin'] as const,
} as const;
