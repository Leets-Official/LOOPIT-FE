export const repairKeys = {
  all: ['repair'] as const,
  wishlistCheck: (shopNames: string[]) =>
    [...repairKeys.all, 'wishlistCheck', [...shopNames].sort().join(',')] as const,
};
