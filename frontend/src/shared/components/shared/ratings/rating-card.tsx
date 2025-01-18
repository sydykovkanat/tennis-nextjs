import { Card, ScrollArea, ScrollBar } from '@/shared/components/ui';
import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib';
import { formatChapter } from '@/shared/lib/helpers/format-chapter';
import { Rating } from '@/shared/types/rating.types';
import { ArrowRight } from 'lucide-react';

import React from 'react';

import styles from './rating-card.module.css';

interface Props {
  className?: string;
  rating: Rating;
}

export const RatingCard: React.FC<Props> = ({ className, rating }) => {
  return (
    <div className={cn(className)}>
      <h3 className={styles.chapter}>{formatChapter(rating.chapter)}</h3>
      <div className={cn(styles.rating, 'dark:bg-[#1F2937]')}>
        <div className={styles.ratingTitles}>
          <h3>{rating.year} Год</h3>
        </div>
        <ScrollArea>
          <div className={styles.events}>
            {rating.events.map((event) => (
              <Card className={styles.eventCard} key={event._id}>
                <CardHeader className={styles.eventCardHeader}>
                  <CardTitle className={styles.eventTitle}>
                    Категория - <span className={styles.eventCategory}>{event.category}</span>
                  </CardTitle>
                  <div className={'mt-2'}>
                    <span className={cn(styles.eventCategory)}>{event.rank}</span> - разряд
                  </div>
                  <CardDescription className={cn(styles.eventDescription, 'group')}>
                    <a
                      target={'_blank'}
                      href={event.link}
                      className={cn(styles.eventLink, 'group-hover:text-tn-dark-green')}
                    >
                      Открыть рейтинг
                      <ArrowRight
                        className={cn(styles.eventArrowRight, 'group-hover:translate-x-1 group-hover:text-inherit ')}
                      />
                    </a>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <ScrollBar orientation={'horizontal'} className={styles.scroll} />
        </ScrollArea>
      </div>
    </div>
  );
};
