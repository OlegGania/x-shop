import { useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';
import type { Brand } from '@/types/brand';

export type UseBrandsResult = {
  brands: Brand[];
  isLoading: boolean;
  isError: boolean;
};

export const useBrands = (): UseBrandsResult => {
  const { getBrands } = useProductService();

  const { data, isLoading, isError } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  return {
    brands: data ?? [],
    isLoading,
    isError,
  };
};
