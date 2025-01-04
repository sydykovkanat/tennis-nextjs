'use client';

import { Confirm } from '@/shared/components/shared';
import { EventEdit } from '@/shared/components/shared/ratings/components/event-edit/event-edit';
import styles from '@/shared/components/shared/ratings/rating-card.module.css';
import { Button, Card } from '@/shared/components/ui';
import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { deleteEvent } from '@/shared/lib/features/rating/rating-thunks';
import { Event } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';
import { ArrowRight, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React from 'react';

interface Props {
  event: Event;
  ratings: Rating[];
}

export const EventCard: React.FC<Props> = ({ event, ratings }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    await dispatch(deleteEvent(event._id)).unwrap();
    toast.success('Событие успешно удалено');
    router.refresh();
  };

  return (
    <Card id={'eventItem'} className={cn(styles.eventCard, 'dark:border-black')}>
      <CardHeader>
        <CardTitle className={styles.eventTitle}>
          Категория - <span className={styles.eventCategory}>{event.category}</span>
        </CardTitle>
        <div className={'mt-2'}>
          <span className={cn(styles.eventCategory)}>{event.rank}</span> - разряд
        </div>
        <CardDescription className={cn(styles.eventDescription, 'group')}>
          <a
            id={'openRatingButton'}
            target={'_blank'}
            href={event.link}
            className={cn(styles.eventLink, 'group-hover:text-tn-dark-green')}
          >
            Открыть рейтинг
            <ArrowRight className={cn(styles.eventArrowRight, 'group-hover:translate-x-1 group-hover:text-inherit ')} />
          </a>
        </CardDescription>
        <div className={'flex justify-between'}>
          <div className={'flex gap-2 mt-2'}>
            <Confirm onOk={handleDelete}>
              <Button aria-label={'delete-event'} size={'icon'} icon={Trash} />
            </Confirm>

            <EventEdit ratings={ratings} id={event._id}>
              <Button aria-label={'edit-event'} size={'icon'} icon={Pencil} />
            </EventEdit>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
