'use client';

import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';
import { deleteEmptyQueryStrings, useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectNews, selectNewsPages } from '@/shared/lib/features/news/news-slice';
import { fetchNews } from '@/shared/lib/features/news/news-thunks';
import { Filters, NewsQuery } from '@/shared/types/root.types';
import { useSearchParams } from 'next/navigation';

import { useEffect, useRef } from 'react';

export const AdminNewsPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const news = useAppSelector(selectNews);
  const pages = useAppSelector(selectNewsPages);
  let queryObj: NewsQuery | undefined;
  const prevQueryRef = useRef<string | null>(null);

  if (searchParams) {
    queryObj = {
      page: searchParams.get('page') || '1',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
    };
  }

  const validatedQuery = queryObj && deleteEmptyQueryStrings(queryObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: Filters = { query: validatedQuery };

  useEffect(() => {
    const currentQuery = JSON.stringify(validatedQuery);

    if (currentQuery !== prevQueryRef.current) {
      prevQueryRef.current = currentQuery;
      dispatch(fetchNews(data));
    }
  }, [dispatch, validatedQuery, data]);

  return <>{renderNewsContent({ news, pages })}</>;
};
