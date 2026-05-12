import { Product } from '@/types/product';

export const sortProductsByLowestPrice = (products: Product[], quantity: number) => {
  const sortedProduct = products.sort((a, b) => a.price - b.price);
  return sortedProduct.slice(0, quantity);
};
