export const USER_ENDPOINTS = {
  USER: '/user',
  UPDATE: (userId: number) => `/user/${userId}`,
  UPDATE_IMAGE: (userId: number) => `/user/image/${userId}`,
} as const;
