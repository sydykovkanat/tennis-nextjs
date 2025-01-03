import { cn } from '@/shared/lib';
import type { Metadata } from 'next';

import React from 'react';

import styles from './news-title.module.css';

export const metadata: Metadata = {
  title: 'Свежие новости',
  description: 'Блог Кыргызстанского сообщества любителей тенниса',
};

interface Props {
  isHomePage?: boolean;
}

export const NewsTitle: React.FC<Props> = ({ isHomePage }) => {
  const Title = isHomePage ? 'h4' : 'h1';
  const Subtitle = isHomePage ? 'h5' : 'h2';

  return (
    <div className={cn(styles.newsTitleBlock)}>
      <Title className={cn(styles.newsTitle, 'dark:text-white')}>Свежие новости</Title>
      <Subtitle className={cn(styles.newsSubtitle)}>Наш блог</Subtitle>
    </div>
  );
};
