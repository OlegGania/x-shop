import axios from 'axios';
import axiosService from '@/shared/api/axiosService';
import type { Product } from '@/types/product';
import type { Brand } from '@/types/brand';
import type { Review } from '@/types/review';
import type { Category } from '@/types/category';
import type { ProductsQueryParams } from '@/types/filters';
import type { PaginatedApiResponse, ProductsPaginatedParams } from '@/types/pagination';

export const useProductService = () => {
  const getAllProducts = async (): Promise<Product[]> => {
    const response = await axiosService.get<Product[]>('/products_view?');
    return response.data;
  };

  const getProductDetails = async (id: number): Promise<Product> => {
    const response = await axiosService.get<Product[]>(`/products_view?id=eq.${id}`);

    if (!response.data || response.data.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }

    return response.data[0];
  };

  const getProductsQueryUrl = ({
    categories = [],
    brands = [],
    sortType = 'Newest',
    minPrice = 0,
    maxPrice = 200,
  }: ProductsQueryParams): string => {
    const params = new URLSearchParams();

    if (categories.length) params.append('category', `in.(${categories.join(',')})`);
    if (brands.length) params.append('brand', `in.(${brands.join(',')})`);

    params.append('price', `gte.${minPrice}`);
    params.append('price', `lte.${maxPrice}`);

    let orderParam: string;
    switch (sortType) {
      case 'Newest':
        orderParam = 'id.desc';
        break;
      case 'Most Popular':
        orderParam = 'rating.desc';
        break;
      case 'Highest Price':
        orderParam = 'price.desc';
        break;
      case 'Lowest Price':
        orderParam = 'price.asc';
        break;
      default:
        orderParam = 'id.desc';
    }

    return `/products_view?${params.toString()}&order=${orderParam}`;
  };

  const getProductsPaginated = async ({
    url,
    page = 1,
    limit = 6,
  }: ProductsPaginatedParams): Promise<PaginatedApiResponse<Product>> => {
    const offset = (page - 1) * limit;
    const rangeEnd = offset + limit - 1;

    try {
      const response = await axiosService.get<Product[]>(url, {
        headers: { Range: `${offset}-${rangeEnd}` },
      });

      const contentRange = response.headers['content-range'] as string | undefined;
      const totalItems = contentRange ? Number(contentRange.split('/')[1]) : 0;
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: response.data,
        totalItems,
        totalPages,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 416) {
        return { data: [], totalItems: 0, totalPages: 0 };
      }
      throw error;
    }
  };

  const getCategories = async (): Promise<Category[]> => {
    const response = await axiosService.get<Category[]>('/categories');
    return response.data;
  };

  const getBrands = async (): Promise<Brand[]> => {
    const response = await axiosService.get<Brand[]>('/brands');
    return response.data;
  };

  const getReviews = async (): Promise<Review[]> => {
    const response = await axiosService.get<Review[]>('/reviews');
    return response.data;
  };

  return {
    getAllProducts,
    getProductDetails,
    getProductsPaginated,
    getCategories,
    getBrands,
    getReviews,
    getProductsQueryUrl,
  };
};
