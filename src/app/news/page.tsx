'use client';

import { useNews } from '@/app/news/hooks/useNews';
import { Container, CustomPagination, DatePicker, NewsTitle } from '@/shared/components/shared';
import { NewsCard } from '@/shared/components/shared/news/news-card/news-card';
import { cn } from '@/shared/lib/utils';

import React from 'react';

import styles from './news.module.css';

export default function Page() {
  const { news, totalPages, page, setPage, handleDateChange } = useNews();

  const renderNewsContent = () =>
    news.length === 0 ? (
      <h2 className='text-center'>На данный момент новостей нету!</h2>
    ) : (
      <>
        <div className={cn(styles.newsContainer)}>
          {news.map((newsItem) => (
            <NewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
        <CustomPagination page={page} total={totalPages} setPage={(page) => setPage(page)} />
      </>
    );

  return (
    <Container>
      <NewsTitle />
      <DatePicker onDateChange={handleDateChange} />
      {renderNewsContent()}
    </Container>
  );
}
