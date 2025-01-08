import styles from '@/app/(root)/news/news.module.css';
import { Container, DatePicker, NewsTitle } from '@/shared/components/shared';
import { Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React from 'react';

export default function Loading() {
  const arr = new Array(12).fill(null);

  return (
    <Container>
      <NewsTitle />
      <DatePicker />

      <div className={cn(styles.newsContainer)}>
        {arr.map((_, i) => (
          <Skeleton key={i} className={cn(styles.skeletonCard)}>
            <Skeleton>
              <Skeleton className={cn(styles.skeletonCardImageBlock)}>
                <Skeleton className={cn(styles.skeletonImage)} />
              </Skeleton>
              <Skeleton className={cn(styles.skeletonCardTextBlock)}>
                <div className={cn(styles.skeletonCardTextContent)}>
                  <Skeleton className={cn(styles.skeletonCardText, 'w-[95%]')} />
                  <Skeleton className={cn(styles.skeletonCardText, 'w-[90%]')} />
                  <Skeleton className={cn(styles.skeletonCreatedAt)} />
                </div>
              </Skeleton>
            </Skeleton>
          </Skeleton>
        ))}
      </div>
    </Container>
  );
}
