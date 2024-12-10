import { axiosApi, toQueryParams } from '@/shared/lib';
import { News, NewsResponse } from '@/shared/types/news.types';

interface Filters {
  query: { [p: string]: string | number } | undefined;
}

export const fetchNews = async ({ data }: { data: Filters }) => {
  let query = '';
  try {
    if (data?.query) {
      query = toQueryParams(data.query);
    }
    const { data: news } = await axiosApi.get<NewsResponse>(`/news/${query}`);
    return news;
  } catch (error) {
    console.error('Error fetching news: ', error);
    throw error;
  }
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