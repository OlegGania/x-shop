import { Product } from '@/types/product';

export const sortProductsByHighRating = (products: Product[], quantity: number) => {
  const sortedProducts = products.sort(
    (productOne, productTwo) => productTwo.rating - productOne.rating,
  );
  return sortedProducts.slice(0, quantity);
};
