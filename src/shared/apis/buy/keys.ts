export const buyKeys = {
  all: ['buy'] as const,
  list: (params?: {
    page?: number;
    manufacturer?: string;
    series?: string;
    priceRange?: string;
    keyword?: string;
  }) => [
    ...buyKeys.all,
    'list',
    params?.page ?? 0,
    params?.manufacturer ?? '',
    params?.series ?? '',
    params?.priceRange ?? '',
    params?.keyword ?? '',
  ] as const,
  detail: (id?: string | number) => [...buyKeys.all, 'detail', id] as const,
  autocomplete: (keyword: string) => [...buyKeys.all, 'autocomplete', keyword] as const,
};
