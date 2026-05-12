import { useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';
import type { Product } from '@/types/product';

export type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

export const useProducts = (): UseProductsResult => {
  const { getAllProducts } = useProductService();

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return {
    products: data ?? [],
    isLoading,
    isError,
  };
};
