'use client';

import { EventForm } from '@/shared/components/shared';
import styles from '@/shared/components/shared/ratings/rating-card.module.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectEvent } from '@/shared/lib/features/rating/rating-slice';
import { editEvent, fetchRatings, getEvent } from '@/shared/lib/features/rating/rating-thunks';
import { EventMutation } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React, { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  id: string;
  ratings: Rating[];
}

export const EventEdit: React.FC<Props> = ({ id, ratings, children }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const event = useAppSelector(selectEvent);
  const router = useRouter();

  React.useEffect(() => {
    if (open) {
      dispatch(getEvent(id));
    }
  }, [dispatch, id, open]);

  const handleEdit = async (eventMutation: EventMutation) => {
    await dispatch(editEvent({ id, eventMutation })).unwrap();
    await dispatch(fetchRatings()).unwrap();
    toast.success('Событие успешно отредактировано');
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование события</DialogTitle>

          <DialogDescription className={styles.dialogContent}>
            Введите данные для редактирования события. После редактирования, событие будет доступно для просмотра на
            странице Рейтинг
          </DialogDescription>

          <EventForm onSubmit={handleEdit} ratings={ratings} event={event || undefined} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
