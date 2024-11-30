import { fetchNews } from '@/actions/news';
import { News } from '@/shared/types/news.types';

import { useEffect, useState } from 'react';

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState({
    startDate: '',
    endDate: '',
  });
  const [page, setPage] = useState(1);
  const [dateFilterApplied, setDateFilterApplied] = useState(false);

  const handleDateChange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setQuery({
      startDate: startDate ? startDate.toISOString() : '',
      endDate: endDate ? endDate.toISOString() : '',
    });
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsResponse = await fetchNews({ page, startDate: query.startDate, endDate: query.endDate });
        setNews(newsResponse.data);
        setTotalPages(newsResponse.pages);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    if (query.startDate && query.endDate && !dateFilterApplied) {
      setPage(1);
      setDateFilterApplied(true);
    }

    void getNews();
  }, [page, query, dateFilterApplied]);

  return {
    news,
    totalPages,
    page,
    setPage,
    handleDateChange,
  };
};
