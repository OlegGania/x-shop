import axiosService from '@/shared/api/axiosService';
import type { Product } from '@/types/product';

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const inQuery = `(${ids.join(',')})`;
  const { data } = await axiosService.get<Product[]>(`/products_view?id=in.${inQuery}`);
  return data ?? [];
}
