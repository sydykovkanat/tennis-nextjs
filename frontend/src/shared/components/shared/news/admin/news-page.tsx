'use client';

import { fetchNews } from '@/actions/news';
import { NewsResponse } from '@/shared/types/news.types';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (!news) {
      void getData();
    }
  }, [data, news]);

  return <>{news && renderNewsContent({ news: news, pages: pages })}</>;
};
