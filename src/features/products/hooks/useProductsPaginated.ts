import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';

import type {
  PaginatedApiResponse,
  PaginatedData,
  ProductsPaginatedParams,
  UsePaginatedResult,
} from '../../../types/pagination';
import { Product } from '../../../types/product';

export const useProductsPaginated = ({
  page = 1,
  limit = 6,
  url,
}: ProductsPaginatedParams): UsePaginatedResult<Product> => {
  const { getProductsPaginated } = useProductService();

  const { data, isLoading, isError } = useQuery<
    PaginatedApiResponse<Product>,
    Error,
    PaginatedData<Product>
  >({
    queryKey: ['products', url, page],
    queryFn: () => getProductsPaginated({ url, page, limit }),
    placeholderData: keepPreviousData,
    select: (response) => ({
      items: response.data ?? [],
      totalPages: response.totalPages ?? 1,
      totalItems: response.totalItems ?? 0,
    }),
  });

  return {
    items: data?.items ?? [],
    totalPages: data?.totalPages ?? 1,
    totalItems: data?.totalItems ?? 0,
    isLoading,
    isError,
  };
};
