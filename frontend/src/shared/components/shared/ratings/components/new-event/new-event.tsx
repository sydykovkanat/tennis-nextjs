'use client';

import { EventForm } from '@/shared/components/shared/ratings/components/event-form/event-form';
import styles from '@/shared/components/shared/ratings/rating-card.module.css';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { useAppDispatch } from '@/shared/lib';
import { createEvent, fetchRatings } from '@/shared/lib/features/rating/rating-thunks';
import { EventMutation } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React, { type PropsWithChildren, useRef } from 'react';

interface Props extends PropsWithChildren {
  ratings: Rating[];
}

export const NewEvent: React.FC<Props> = ({ ratings, children }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateEvent = async (eventMutation: EventMutation) => {
    await dispatch(createEvent(eventMutation)).unwrap();
    await dispatch(fetchRatings()).unwrap();
    closeRef.current?.click();
    toast.success('Событие успешно добавлено');
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Новое событие</DialogTitle>
          <DialogDescription className={styles.dialogContent}>
            Введите данные для создания нового события. После создания, событие будет доступно для просмотра на странице
            Рейтинг
          </DialogDescription>

          <EventForm onSubmit={handleCreateEvent} ratings={ratings} />
        </DialogHeader>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
};
