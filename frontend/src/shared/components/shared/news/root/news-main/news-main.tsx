import { fetchNewsByLimit } from '@/actions/news';
import { NewsCardMain, NewsTitle } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './news-main.module.css';

interface Props {
  className?: string;
}

export const NewsMain: React.FC<Props> = async ({ className }) => {
  const news = await fetchNewsByLimit({ limit: 3 });

  return (
    <>
      <NewsTitle isHomePage />
      <div className={cn(styles.newsMainContainer, className)}>
        {news.data.map((newsItem) => (
          <NewsCardMain key={newsItem._id} news={newsItem} />
        ))}
      </div>
    </>
  );
};
