'use client';

import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';
import { deleteEmptyQueryStrings, useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectNews, selectNewsPages } from '@/shared/lib/features/news/news-slice';
import { fetchNews } from '@/shared/lib/features/news/news-thunks';
import { Filters } from '@/shared/types/root.types';
import { useSearchParams } from 'next/navigation';



import { useCallback, useEffect, useMemo, useState } from 'react';


export const AdminNewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const pages = useAppSelector(selectNewsPages);
  const searchParams = useSearchParams();
  const [data, setData] = useState<Filters | undefined>(undefined);

  const updateFilters = useCallback(() => {
    const queryObj = {
      page: searchParams.get('page') || '1',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    };

    const validatedQuery = deleteEmptyQueryStrings(queryObj);
    setData({ query: validatedQuery });
  }, [searchParams]);

  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  useEffect(() => {
    if (!news.length) {
      dispatch(fetchNews(data));
    }
  }, [dispatch, news.length, data]);

  const renderedContent = useMemo(() => renderNewsContent({ news, pages }), [news, pages]);

  return <>{renderedContent}</>;
};
