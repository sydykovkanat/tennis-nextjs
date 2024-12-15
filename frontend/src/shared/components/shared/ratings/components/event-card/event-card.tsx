'use client';

import { useDialogState } from '@/app/(root)/news/hooks/use-dialog-state';
import { Confirm } from '@/shared/components/shared';
import { EventEdit } from '@/shared/components/shared/ratings/components/event-edit/event-edit';
import styles from '@/shared/components/shared/ratings/rating-card.module.css';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { deleteEvent, fetchRatings } from '@/shared/lib/features/rating/rating-thunks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { Event } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';
import { ArrowRight, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

import React, { useEffect } from 'react';

interface Props {
  event: Event;
  ratings: Rating[];
}

export const EventCard: React.FC<Props> = ({ event, ratings }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { open, toggleOpen } = useDialogState();

  const handleDelete = async () => {
    await dispatch(deleteEvent(event._id)).unwrap();
    await dispatch(fetchRatings()).unwrap();
    toast.success('Событие успешно удалено');
  };

  useEffect(() => {
    if (user) dispatch(fetchOneUser(user._id));
  }, [dispatch, user]);

  return (
    <Card id={'eventItem'} className={styles.eventCard}>
      <CardHeader>
        <CardTitle className={styles.eventTitle}>
          Категория - <span className={styles.eventCategory}>{event.category.name}</span>
        </CardTitle>

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
              <Button size={'icon'} icon={Trash} />
            </Confirm>

            <EventEdit ratings={ratings} id={event._id}>
              <Button aria-label={'edit-event'} size={'icon'} icon={Pencil} />
            </EventEdit>
          </div>
        </div>

        {open && (
          <Dialog open={open} onOpenChange={toggleOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold'>Внимание!</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
    </Card>
  );
};
