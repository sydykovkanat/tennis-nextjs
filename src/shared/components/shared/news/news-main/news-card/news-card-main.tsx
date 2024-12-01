'use client';

import { Card } from '@/shared/components/ui';
import { CardContent } from '@/shared/components/ui/card';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { News } from '@/shared/types/news.types';
import Link from 'next/link';

import React from 'react';

import styles from './news-card.module.css';

interface Props {
  news: News;
  classname?: string;
}

export const NewsCardMain: React.FC<Props> = ({ news, classname }) => {
  const { _id, title, subtitle, newsCover } = news;

  return (
    <Link href={`/news/${_id}`} className={cn(styles.newsLink, classname)}>
      <Card className={cn(styles.newsCardMain)} style={{ backgroundImage: `url(${API_URL}/${newsCover})` }}>
        <CardContent className='flex flex-col h-full'>
          <div className='mt-auto'>
            <p className={cn(styles.cardText)}>{subtitle}</p>
            <h3 className={cn(styles.cardText, 'font-bold')}>{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
