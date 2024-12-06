import { cn } from '@/shared/lib';
import type { Metadata } from 'next';

import React from 'react';

import styles from './news-title.module.css';

export const metadata: Metadata = {
  title: 'Свежие новости',
  description: 'Блог Кыргызстанского сообщества любителей тенниса',
};

export const NewsTitle: React.FC = () => {
  return (
    <div className={cn(styles.newsTitleBlock)}>
      <h1 className={cn(styles.newsTitle)}>Свежие новости</h1>
      <h2 className={cn(styles.newsSubtitle)}>Наш блог</h2>
    </div>
  );
};
