export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedApiResponse<T> = {
  data: T[];
  totalPages: number;
  totalItems: number;
};

export type PaginatedData<T> = {
  items: T[];
  totalPages: number;
  totalItems: number;
};

export type UsePaginatedResult<T> = {
  items: T[];
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
};

export type ProductsPaginatedParams = PaginationParams & {
  url: string;
};
