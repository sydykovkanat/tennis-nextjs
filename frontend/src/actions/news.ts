import { axiosApi, toQueryParams } from '@/shared/lib';
import { News, NewsResponse } from '@/shared/types/news.types';
import { Filters } from '@/shared/types/root.types';

export const fetchNews = async ({ data }: { data: Filters }) => {
  const query = data?.query ? toQueryParams(data.query) : '';
  return (await axiosApi.get<NewsResponse>(`/news/${query}`)).data;
};

export const fetchOneNews = async (id: string) => {
  const { data: oneNews } = await axiosApi.get<News>(`/news/${id}`);
  return oneNews;
};

export const fetchNewsByLimit = async ({ limit, excludeId }: { limit: number; excludeId?: string }) => {
  const params = { limit, ...(excludeId ? { excludeId } : {}) };
  const { data: news } = await axiosApi.get<NewsResponse>('/news', { params });
  return news;
};
