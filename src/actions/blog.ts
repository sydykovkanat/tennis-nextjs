import { axiosApi } from '@/shared/lib/axios-api';
import { Blogs } from '@/shared/types/blog.types';

export const getBlogs = async () => {
  const { data: blogs } = await axiosApi.get<Blogs>('/news?page=1');

  return blogs;
};
