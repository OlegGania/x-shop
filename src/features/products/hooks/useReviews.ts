import { useQuery } from '@tanstack/react-query';
import { useProductService } from '@/features/products/model/productsService';
import { Review } from '@/types/review';

export type UseReviewsResult = {
  reviews: Review[];
  isLoading: boolean;
  isError: boolean;
};

export const useReviews = (): UseReviewsResult => {
  const { getReviews } = useProductService();

  const { data, isLoading, isError } = useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: getReviews,
  });

  return {
    reviews: data ?? [],
    isLoading,
    isError,
  };
};
