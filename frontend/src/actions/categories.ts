import { axiosApi } from '@/shared/lib';
import { Category } from '@/shared/types/category.types';

export const getCategories = async () => {
  const { data: categories } = await axiosApi.get<Category[]>('/categories');

  return categories;
};
