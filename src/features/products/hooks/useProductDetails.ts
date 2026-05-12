import { useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';
import type { Product } from '@/types/product';
import type { QueryObserverResult } from '@tanstack/react-query';

export type UseProductDetailsResult = {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<Product, Error>>;
};

export const useProductDetails = (id?: number): UseProductDetailsResult => {
  const { getProductDetails } = useProductService();

  const query = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductDetails(id as number),
    enabled: typeof id === 'number',
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
