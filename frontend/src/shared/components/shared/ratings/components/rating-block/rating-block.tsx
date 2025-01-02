'use client';

import { Confirm, EventCard } from '@/shared/components/shared';
import { Button, Card, ScrollArea, ScrollBar } from '@/shared/components/ui';
import { CardHeader, CardTitle } from '@/shared/components/ui/card';
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectRatingsDeleting } from '@/shared/lib/features/rating/rating-slice';
import { deleteRating } from '@/shared/lib/features/rating/rating-thunks';
import { Rating } from '@/shared/types/rating.types';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React from 'react';

import styles from './rating-block.module.css';

interface Props {
  ratings: Rating[];
}

export const RatingBlock: React.FC<Props> = ({ ratings }) => {
  const dispatch = useAppDispatch();
  const ratingsDeleting = useAppSelector(selectRatingsDeleting);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await dispatch(deleteRating(id)).unwrap();
    toast.success('Рейтинг успешно удален');
    router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      {ratings.map((rating) => {
        const isDeleting = ratingsDeleting === rating._id;

        return (
          <Card
            key={rating._id}
            className={cn(styles.cardWrapper, 'dark:bg-[#1F2937] dark:border-black')}
            data-testid={rating.month}
          >
            <CardHeader className={'p-2'}>
              <div className={styles.headerWrapper}>
                <CardTitle className={styles.titleWrapper}>{rating.year} Год</CardTitle>
                <div className={styles.deleteBlock}>
                  <Confirm onOk={() => handleDelete(rating._id)}>
                    <Button aria-label={'deleteRating'} icon={Trash} size={'icon'} loading={isDeleting} />
                  </Confirm>
                </div>
              </div>
            </CardHeader>

            <ScrollArea>
              <div className={styles.events}>
                {rating.events.length === 0 ? (
                  <span className={styles.textGray}>Нет событий</span>
                ) : (
                  rating.events.map((event) => <EventCard key={event._id} event={event} ratings={ratings} />)
                )}
              </div>
              <ScrollBar orientation={'horizontal'} className={styles.scroll} />
            </ScrollArea>
          </Card>
        );
      })}
    </div>
  );
};
