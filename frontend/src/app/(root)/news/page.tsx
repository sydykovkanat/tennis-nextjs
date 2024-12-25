import { fetchNews } from '@/actions/news';
import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';
import Loading from '@/app/(root)/news/loading';
import { Container, GradientCircle, NewsTitle, gradientCircles } from '@/shared/components/shared';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { NewsResponse } from '@/shared/types/news.types';
import type { Metadata } from 'next';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Свежие новости — Главные события мира тенниса в Кыргызстане',
  description:
    'Читайте последние новости о турнирах, достижениях спортсменов и других событиях теннисного мира в Кыргызстане.',
  keywords: 'Новости тенниса в Кыргызстане, Свежие новости о теннисе, Турниры в Кыргызстане, Блог о теннисе',
  openGraph: {
    title: 'Свежие новости — Главные события мира тенниса в Кыргызстане',
    description:
      'Читайте последние новости о турнирах, достижениях спортсменов и других событиях теннисного мира в Кыргызстане.',
    images: 'https://tennis.kg/kslt.svg',
    type: 'website',
  },
};

interface Props {
  searchParams?: { [key: string]: string | null };
}

const NewsPage = async ({ searchParams }: Props) => {
  const queryObj = {
    page: searchParams?.page || '1',
    startDate: searchParams?.startDate || '',
    endDate: searchParams?.endDate || '',
  };

  const validateQuery = queryObj && deleteEmptyQueryStrings(queryObj);
  const data = { query: validateQuery };
  const newsResponse: NewsResponse = await fetchNews({ data });
  const news = newsResponse.data;

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        {gradientCircles.map((circle, id) => (
          <GradientCircle key={id} {...circle} />
        ))}
        <NewsTitle />
        {renderNewsContent({ news: news, pages: newsResponse.pages })}
      </Container>
    </Suspense>
  );
};

export const dynamic = 'force-dynamic';

export default NewsPage;
