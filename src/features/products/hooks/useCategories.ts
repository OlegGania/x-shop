import { useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';
import type { Category } from '@/types/category';

export type UseCategoriesResult = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
};

export const useCategories = (): UseCategoriesResult => {
  const { getCategories } = useProductService();

  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    categories: data ?? [],
    isLoading,
    isError,
  };
};
