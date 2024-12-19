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
          <Skeleton key={i} className={cn('w-full min-w-[280px] rounded-lg')}>
            <Skeleton className={cn('w-full')}>
              <Skeleton className='p-0'>
                <Skeleton className='h-[300px] object-cover mb-5 min-w-full rounded-md' />
              </Skeleton>
              <Skeleton className={cn('flex flex-wrap mt-auto items-start p-6 pt-0')}>
                <div className={'me-auto w-full pb-12'}>
                  <Skeleton className={cn('dark:text-white h-3 mb-2 w-[95%]')} />
                  <Skeleton className={cn('dark:text-white h-3 mb-2 w-[90%]')} />
                  <Skeleton className={cn('dark:text-white h-4 w-[30%]')} />
                </div>
              </Skeleton>
            </Skeleton>
          </Skeleton>
        ))}
      </div>
    </Container>
  );
}
