import { axiosApi } from '@/shared/lib/helpers/axios-api';
import { Blogs } from '@/shared/types/blog.types';

export const getBlogs = async (page: string | null) => {
  const { data: blogs } = await axiosApi.get<Blogs>(`/news${page && `?page=${page}`}`);

  return blogs;
};
