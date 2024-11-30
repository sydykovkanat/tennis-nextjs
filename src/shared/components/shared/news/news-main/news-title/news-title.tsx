import React from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './news-title.module.css';

export const NewsTitle: React.FC = () => {
  return (
    <div className={cn(styles.newsTitleBlock)}>
      <h1 className={cn(styles.newsTitle)}>Свежие новости</h1>
      <h2 className={cn(styles.newsSubtitle)}>Наш блог</h2>
    </div>
  );
};
