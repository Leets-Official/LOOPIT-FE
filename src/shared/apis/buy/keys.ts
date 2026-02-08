export const buyKeys = {
  all: ['buy'] as const,
  list: (
    params?: {
      page?: number;
      manufacturer?: string;
      series?: string | string[];
      priceRange?: string;
      keyword?: string;
    } | null
  ) =>
    [
      ...buyKeys.all,
      'list',
      params?.page ?? 0,
      params?.manufacturer ?? '',
      Array.isArray(params?.series) ? params?.series.join(',') : params?.series ?? '',
      params?.priceRange ?? '',
      params?.keyword ?? '',
    ] as const,
  detail: (id?: string | number) => [...buyKeys.all, 'detail', id] as const,
  autocomplete: (keyword: string) => [...buyKeys.all, 'autocomplete', keyword] as const,
};
