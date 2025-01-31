'use client';

import { RatingForm } from '@/shared/components/shared/ratings/components/rating-form/rating-form';
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
import { createRating } from '@/shared/lib/features/rating/rating-thunks';
import { RatingMutation } from '@/shared/types/rating.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React, { type PropsWithChildren, useRef } from 'react';

export const NewRating: React.FC<PropsWithChildren> = ({ children }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateRating = async (rating: RatingMutation) => {
    await dispatch(createRating(rating)).unwrap();
    closeRef.current?.click();
    toast.success('Рейтинг успешно добавлен');
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый рейтинг</DialogTitle>
          <DialogDescription className={styles.dialogContent}>
            Введите данные для создания нового рейтинга. После создания, рейтинг будет доступен для просмотра на
            странице Рейтинг
          </DialogDescription>

          <RatingForm onSubmit={handleCreateRating} />
        </DialogHeader>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
};
