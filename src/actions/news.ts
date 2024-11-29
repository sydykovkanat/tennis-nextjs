import { axiosApi } from '@/shared/lib/axios-api';
import { News, NewsMutation, NewsResponse } from '@/shared/types/news.types';

interface FetchNewsMutation {
  page: number;
  startDate?: string;
  endDate?: string;
}

const createFormData = (newsMutation: NewsMutation): FormData => {
  const formData = new FormData();
  const keys = Object.keys(newsMutation) as (keyof NewsMutation)[];

  keys.forEach((key) => {
    const value = newsMutation[key];

    switch (true) {
      case Array.isArray(value): {
        if (key === 'images') {
          if (value as File[]) {
            value.forEach((file) => {
              formData.append(key, file);
            });
          } else if (value as string[]) {
            value.forEach((image) => {
              formData.append(key, image);
            });
          }
        }
        break;
      }
      case key === 'images' && Array.isArray(value) && value.length === 0: {
        formData.append(key, JSON.stringify([]));
        break;
      }
      case key === 'newsCover' && value instanceof File: {
        formData.append(key, value);
        break;
      }
      default: {
        formData.append(key, value as string);
      }
    }
  });

  return formData;
};

export const createNews = async (newsMutation: NewsMutation) => {
  const formData = createFormData(newsMutation);
  const { data: news } = await axiosApi.post<News>('/news', formData);
  await fetchNews({ page: 1 });
  return news;
};

export const fetchNews = async ({ page, startDate, endDate }: FetchNewsMutation) => {
  let requestQuery = `/news?page=${page}`;
  if (startDate && endDate) requestQuery = `/news?page=${page}&startDate=${startDate}&endDate=${endDate}`;

  const { data: news } = await axiosApi.get<NewsResponse>(requestQuery);
  return news;
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

export const updateNews = async ({ newsId, newsMutation }: { newsId: string; newsMutation: NewsMutation }) => {
  const formData = createFormData(newsMutation);
  const { data: response } = await axiosApi.put<News>(`/news/${newsId}`, formData);
  await fetchNews({ page: 1 });
  return response;
};

export const removeNews = async (newsId: string) => {
  await axiosApi.delete(`/news/${newsId}`);
  await fetchNews({ page: 1 });
};
