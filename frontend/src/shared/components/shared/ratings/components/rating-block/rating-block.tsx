import { Confirm, EventCard } from '@/shared/components/shared';
import { Button, Card, ScrollArea, ScrollBar } from '@/shared/components/ui';
import { CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectRatingsDeleting } from '@/shared/lib/features/rating/rating-slice';
import { deleteRating } from '@/shared/lib/features/rating/rating-thunks';
import { formatMonth } from '@/shared/lib/helpers/format-month';
import { Rating } from '@/shared/types/rating.types';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import React from 'react';

import styles from './rating-block.module.css';

interface Props {
  ratings: Rating[];
}

export const RatingBlock: React.FC<Props> = ({ ratings }) => {
  const dispatch = useAppDispatch();
  const ratingsDeleting = useAppSelector(selectRatingsDeleting);

  const sortedRatings = [...ratings].sort((a, b) => {
    const yearDiff = b.year - a.year;
    if (yearDiff !== 0) return yearDiff;
    const monthOrder = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
    return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
  });
  const handleDelete = async (id: string) => {
    await dispatch(deleteRating(id)).unwrap();
    toast.success('Рейтинг успешно удален');
  };

  return (
    <div className={'grid gap-4 grid-cols-1'}>
      {sortedRatings.map((rating) => {
        const isDeleting = ratingsDeleting === rating._id;

        return (
          <Card key={rating._id} className={'relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'}>
            <CardHeader className={'p-2'}>
              <div className={'flex  justify-between p-0'}>
                <CardTitle className={'w-80 flex items-center'}>
                  {rating.year} - {formatMonth(rating.month)}
                </CardTitle>
                <div className={'flex justify-end gap-2 mb-2'}>
                  <Confirm onOk={() => handleDelete(rating._id)}>
                    <Button aria-label={'deleteRating'} icon={Trash} size={'icon'} loading={isDeleting} />
                  </Confirm>
                </div>
              </div>
            </CardHeader>

            <ScrollArea>
              <div className={styles.events}>
                {rating.events.length === 0 ? (
                  <span className={'block text-center text-muted-foreground'}>Нет событий</span>
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
