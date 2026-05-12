export const SORT_TYPES = {
  NEWEST: 'Newest',
  MOST_POPULAR: 'Most Popular',
  HIGHEST_PRICE: 'Highest Price',
  LOWEST_PRICE: 'Lowest Price',
} as const;

export type SortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];

const isSortType = (value: string | null): value is SortType => {
  if (!value) return false;
  return Object.values(SORT_TYPES).includes(value as SortType);
};

export const getSortType = (value: string | null): SortType => {
  return isSortType(value) ? value : SORT_TYPES.NEWEST;
};

export type ProductFilters = {
  categories: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  sort: SortType;
};

export type ProductsQueryParams = {
  categories?: string[];
  brands?: string[];
  sortType?: SortType;
  minPrice?: number;
  maxPrice?: number;
};
