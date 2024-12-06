'use client';

import { fetchNews } from '@/actions/news';
import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { NewsResponse } from '@/shared/types/news.types';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsResponse['data'] | null>(null);
  const [pages, setPages] = useState<NewsResponse['pages']>(1);
  const searchParams = useSearchParams();
  let queryObj;

  if (searchParams) {
    queryObj = {
      page: searchParams.get('page') || '1',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    };
  }

  const validateQuery = queryObj && deleteEmptyQueryStrings(queryObj);
  const data = { query: validateQuery };

  useEffect(() => {
    const getData = async () => {
      try {
        const newsResponse: NewsResponse = await fetchNews({ data });
        setNews(newsResponse.data);
        setPages(newsResponse.pages);
      } catch (err) {
        console.log(err);
      }
    };

    void getData();
  }, [data]);

  return <>{news && renderNewsContent({ news: news, pages: pages })}</>;
};
