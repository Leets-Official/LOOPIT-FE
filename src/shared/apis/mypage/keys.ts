export const mypageKeys = {
  all: ['mypage'] as const,
  profile: () => [...mypageKeys.all, 'profile'] as const,
  buyHistory: (status: string) => [...mypageKeys.all, 'buyHistory', status] as const,
  sellHistory: (status: string) => [...mypageKeys.all, 'sellHistory', status] as const,
};
