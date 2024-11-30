import { axiosApi } from '@/shared/lib/axios-api';
import { Blogs } from '@/shared/types/blog.types';

<<<<<<< HEAD
export const getBlogs = async (page: string | null) => {
  const { data: blogs } = await axiosApi.get<Blogs>(`/news${page && `?page=${page}`}`);
=======
export const getBlogs = async () => {
  const { data: blogs } = await axiosApi.get<Blogs>('/news?page=1');
>>>>>>> 3b7c14e8b109882c11ac3ec039cca77865342454

  return blogs;
};
