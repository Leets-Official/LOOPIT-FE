export const buyKeys = {
  all: ['buy'] as const,
  lists: () => [...buyKeys.all, 'infinite'] as const,
  list: (
    params?: {
      page?: number;
      manufacturer?: string;
      series?: string[];
      priceRange?: string;
      keyword?: string;
    } | null
  ) =>
    [
      ...buyKeys.all,
      'list',
      params?.page ?? 0,
      params?.manufacturer ?? '',
      params?.series?.join(',') ?? '',
      params?.priceRange ?? '',
      params?.keyword ?? '',
    ] as const,
  infinite: (params?: { manufacturer?: string; series?: string[]; priceRange?: string; keyword?: string }) =>
    [
      ...buyKeys.all,
      'infinite',
      params?.manufacturer ?? '',
      params?.series?.join(',') ?? '',
      params?.priceRange ?? '',
      params?.keyword ?? '',
    ] as const,
  detail: (id?: string | number) => [...buyKeys.all, 'detail', id] as const,
  autocomplete: (keyword: string) => [...buyKeys.all, 'autocomplete', keyword] as const,
};
