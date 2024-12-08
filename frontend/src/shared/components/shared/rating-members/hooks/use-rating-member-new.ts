'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRatingMemberCreating } from '@/shared/lib/features/rating-members/rating-members-slice';
import { createRatingMember, fetchRatingMembers } from '@/shared/lib/features/rating-members/rating-members-thunks';
import { RatingMemberMutation } from '@/shared/types/rating-member.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

import { useState } from 'react';

export const useRatingMemberNew = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: RatingMemberMutation) => {
    try {
      await dispatch(createRatingMember(state)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return { isCreating, open, setOpen, handleClose, onFormSubmit };
};
