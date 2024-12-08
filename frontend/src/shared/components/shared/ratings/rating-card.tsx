import { Card, ScrollArea, ScrollBar } from '@/shared/components/ui';
import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib';
import { formatChapter } from '@/shared/lib/helpers/format-chapter';
import { formatMonth } from '@/shared/lib/helpers/format-month';
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
      <div className={styles.rating}>
        <div className={styles.ratingTitles}>
          <h3>{rating.year}</h3>
          <h3>{formatMonth(rating.month)}</h3>
        </div>
        <ScrollArea>
          <div className={styles.events}>
            {rating.events.map((event) => (
              <Card className={styles.eventCard} key={event._id}>
                <CardHeader>
                  <CardTitle className={styles.eventTitle}>
                    Категория - <span className={styles.eventCategory}>{event.category.name}</span>
                  </CardTitle>
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
